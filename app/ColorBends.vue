<template>
  <div
    ref="containerRef"
    :class="['color-bends-container', props.className]"
    :style="props.style"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import {
  Clock,
  Color,
  DoubleSide,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";

interface ColorBendsProps {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
}

const props = withDefaults(defineProps<ColorBendsProps>(), {
  rotation: 90,
  speed: 0.2,
  colors: () => [],
  transparent: true,
  autoRotate: 0,
  scale: 1,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.15,
  iterations: 1,
  intensity: 1.5,
  bandWidth: 6,
});

const MAX_COLORS = 8 as const;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  float aspect = max(uCanvas.x / max(uCanvas.y, 1.0), 0.5);
  vec2 p = (vUv * 2.0 - 1.0) * vec2(aspect, 1.0);
  p /= max(uScale, 0.0001);
  vec2 rotated = vec2(
    p.x * uRot.x - p.y * uRot.y,
    p.x * uRot.y + p.y * uRot.x
  );
  rotated += uPointer * uParallax * 0.18;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations) break;
    float phase = float(j) * 1.7;
    rotated.x += sin(
      rotated.y * 2.2 * uFrequency + t * 0.7 + phase
    ) * 0.08 * uWarpStrength;
    rotated.y += cos(
      rotated.x * 2.0 * uFrequency - t * 0.55 + phase
    ) * 0.06 * uWarpStrength;
  }

  vec3 base = vec3(0.003, 0.035, 0.055);
  if (uColorCount > 0) base += uColors[0] * 0.055;

  vec3 col = base;
  float cover = 0.0;
  float colorDivisor = max(float(uColorCount - 1), 1.0);
  float width = 0.13 + 0.026 * max(uBandWidth, 1.0);

  for (int i = 0; i < MAX_COLORS; ++i) {
    if (i >= uColorCount) break;
    float fi = float(i);
    float center = mix(-0.72, 0.72, fi / colorDivisor);
    float wave = center
      + 0.23 * sin(
        rotated.x * 2.15 * uFrequency + t * (0.7 + fi * 0.08) + fi * 1.8
      )
      + 0.09 * sin(
        rotated.x * 4.6 * uFrequency - t * 0.45 + fi * 0.9
      );
    wave += uPointer.y * uMouseInfluence * 0.11;
    float distanceToBand = abs(rotated.y - wave);
    float core = 1.0 - smoothstep(0.0, width, distanceToBand);
    float halo = (
      1.0 - smoothstep(width, width * 2.7, distanceToBand)
    ) * 0.34;
    float weight = core + halo;
    col += uColors[i] * weight;
    cover = max(cover, weight);
  }

  col = clamp(col * uIntensity, 0.0, 1.0);

  if (uNoise > 0.0001) {
    float n = fract(
      sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233)))
      * 43758.5453123
    );
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  float alpha = uTransparent > 0 ? clamp(cover * 1.2, 0.0, 1.0) : 1.0;
  vec3 rgb = uTransparent > 0 ? col * alpha : col;
  gl_FragColor = vec4(rgb, alpha);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const containerRef = ref<HTMLDivElement | null>(null);
const rendererRef = ref<WebGLRenderer | null>(null);
const materialRef = ref<ShaderMaterial | null>(null);
const resizeObserverRef = ref<ResizeObserver | null>(null);
const pointerTargetRef = ref(new Vector2(0, 0));
const pointerCurrentRef = ref(new Vector2(0, 0));
const rotationRef = ref(props.rotation);
const autoRotateRef = ref(props.autoRotate);
let rafId: number | null = null;
let cleanup: (() => void) | null = null;

const applyProps = () => {
  const material = materialRef.value;
  if (!material) return;

  rotationRef.value = props.rotation;
  autoRotateRef.value = props.autoRotate;
  material.uniforms.uSpeed.value = props.speed;
  material.uniforms.uScale.value = props.scale;
  material.uniforms.uFrequency.value = props.frequency;
  material.uniforms.uWarpStrength.value = props.warpStrength;
  material.uniforms.uMouseInfluence.value = props.mouseInfluence;
  material.uniforms.uParallax.value = props.parallax;
  material.uniforms.uNoise.value = props.noise;
  material.uniforms.uIterations.value = props.iterations;
  material.uniforms.uIntensity.value = props.intensity;
  material.uniforms.uBandWidth.value = props.bandWidth;

  const colors = props.colors
    .filter(Boolean)
    .slice(0, MAX_COLORS)
    .map((hex) => {
      const color = new Color(hex);
      return new Vector3(color.r, color.g, color.b);
    });
  const uniforms = material.uniforms.uColors.value as Vector3[];
  for (let index = 0; index < MAX_COLORS; index += 1) {
    if (colors[index]) uniforms[index].copy(colors[index]);
    else uniforms[index].set(0, 0, 0);
  }
  material.uniforms.uColorCount.value = colors.length;
  material.uniforms.uTransparent.value = props.transparent ? 1 : 0;
  rendererRef.value?.setClearColor(0x000000, props.transparent ? 0 : 1);
};

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader: vert,
    fragmentShader: frag,
    uniforms: {
      uCanvas: { value: new Vector2(1, 1) },
      uTime: { value: 0 },
      uSpeed: { value: props.speed },
      uRot: { value: new Vector2(1, 0) },
      uColorCount: { value: 0 },
      uColors: {
        value: Array.from(
          { length: MAX_COLORS },
          () => new Vector3(0, 0, 0),
        ),
      },
      uTransparent: { value: props.transparent ? 1 : 0 },
      uScale: { value: props.scale },
      uFrequency: { value: props.frequency },
      uWarpStrength: { value: props.warpStrength },
      uPointer: { value: new Vector2(0, 0) },
      uMouseInfluence: { value: props.mouseInfluence },
      uParallax: { value: props.parallax },
      uNoise: { value: props.noise },
      uIterations: { value: props.iterations },
      uIntensity: { value: props.intensity },
      uBandWidth: { value: props.bandWidth },
    },
    premultipliedAlpha: true,
    side: DoubleSide,
    transparent: true,
  });
  materialRef.value = material;
  scene.add(new Mesh(geometry, material));

  const renderer = new WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
  });
  rendererRef.value = renderer;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const handleResize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    (material.uniforms.uCanvas.value as Vector2).set(width, height);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    const y = -(((event.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    pointerTargetRef.value.set(x, y);
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);
  resizeObserverRef.value = resizeObserver;
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  handleResize();
  applyProps();

  const clock = new Clock();
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const render = () => {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;
    material.uniforms.uTime.value = reduceMotion ? 0 : elapsed;

    const degrees =
      (rotationRef.value % 360) + autoRotateRef.value * elapsed;
    const radians = (degrees * Math.PI) / 180;
    (material.uniforms.uRot.value as Vector2).set(
      Math.cos(radians),
      Math.sin(radians),
    );

    const current = pointerCurrentRef.value;
    current.lerp(pointerTargetRef.value, Math.min(1, delta * 8));
    (material.uniforms.uPointer.value as Vector2).copy(current);
    renderer.render(scene, camera);

    if (!reduceMotion) rafId = requestAnimationFrame(render);
  };
  render();

  cleanup = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", handlePointerMove);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
});

onBeforeUnmount(() => cleanup?.());

watch(
  () => [
    props.rotation,
    props.autoRotate,
    props.speed,
    props.scale,
    props.frequency,
    props.warpStrength,
    props.mouseInfluence,
    props.parallax,
    props.noise,
    props.iterations,
    props.intensity,
    props.bandWidth,
    props.colors,
    props.transparent,
  ],
  applyProps,
  { deep: true },
);
</script>

<style scoped>
.color-bends-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
