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
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(
    p.x * uRot.x - p.y * uRot.y,
    p.x * uRot.y + p.y * uRot.x
  );
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = uPointer - rp;
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(
      1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency)
    );
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(
        1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency)
      );
      float m0 = length(
        r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0
      );
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(
        warped + sin(
          5.0 * warped.y * uFrequency - 3.0 * t + float(i)
        ) / 4.0
      );
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(
        1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency)
      );
      float m0 = length(
        r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0
      );
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(
        warped + sin(
          5.0 * warped.y * uFrequency - 3.0 * t + float(k)
        ) / 4.0
      );
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(
      sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233)))
      * 43758.5453123
    );
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = uTransparent > 0 ? col * a : col;
  gl_FragColor = vec4(rgb, a);
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
    .map((hex) => new Color(hex));
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
