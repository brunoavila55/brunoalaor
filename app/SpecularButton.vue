<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useAttrs,
} from "vue";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  size: { type: String, default: "lg" },
  radius: { type: Number, default: 18 },
  tint: { type: String, default: "#ffffff" },
  tintOpacity: { type: Number, default: 0 },
  blur: { type: Number, default: 0 },
  textColor: { type: String, default: "#f5f5f5" },
  lineColor: { type: String, default: "#ffffff" },
  baseColor: { type: String, default: "#525252" },
  intensity: { type: Number, default: 1 },
  shineSize: { type: Number, default: 10 },
  shineFade: { type: Number, default: 40 },
  thickness: { type: Number, default: 1 },
  speed: { type: Number, default: 0.35 },
  followMouse: { type: Boolean, default: true },
  proximity: { type: Number, default: 250 },
  autoAnimate: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: "button" },
  href: { type: String, default: "" },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined },
});

const attrs = useAttrs();
const elementRef = ref(null);
const effectRef = ref(null);
const tagName = computed(() => (props.href ? "a" : "button"));

const sizeValues = {
  sm: { font: "0.85rem", x: "22px", y: "10px" },
  md: { font: "1rem", x: "30px", y: "14px" },
  lg: { font: "1.15rem", x: "40px", y: "18px" },
};

const buttonStyle = computed(() => {
  const size = sizeValues[props.size] || sizeValues.md;
  return {
    "--sb-radius": `${props.radius}px`,
    "--sb-tint": props.tint,
    "--sb-tint-strength": `${Math.max(0, props.tintOpacity) * 100}%`,
    "--sb-blur": `${Math.max(0, props.blur)}px`,
    "--sb-text-color": props.textColor,
    "--sb-font-size": size.font,
    "--sb-padding-x": size.x,
    "--sb-padding-y": size.y,
  };
});

const rootAttrs = computed(() => ({
  ...attrs,
  ...(props.href
    ? {
        href: props.disabled ? undefined : props.href,
        target: props.target,
        rel: props.rel,
        "aria-disabled": props.disabled || undefined,
        tabindex: props.disabled ? -1 : attrs.tabindex,
      }
    : { type: props.type, disabled: props.disabled }),
}));

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 lightDirection = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;
  vec2 normal = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(normal, lightDirection)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(
    uShineSize - uShineFade,
    uShineSize + uShineFade + 1e-4,
    phi
  );
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float highlight = line * rim * edgeClamp * uIntensity;
  vec3 color = uBaseColor * base + uLineColor * highlight;
  float alpha = clamp(base + highlight, 0.0, 1.0);
  fragColor = vec4(color, alpha);
}
`;

let disposeEffect = null;

onMounted(() => {
  const element = elementRef.value;
  const effect = effectRef.value;
  if (!element || !effect) return;

  const padding = 20;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let renderer;

  try {
    renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr,
    });
  } catch {
    return;
  }

  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const geometry = new Triangle(gl);
  if (geometry.attributes.uv) delete geometry.attributes.uv;

  const program = new Program(gl, {
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
    uniforms: {
      uCenter: { value: [0, 0] },
      uHalfSize: { value: [1, 1] },
      uRadius: { value: 0 },
      uAngle: { value: 2.4 },
      uPx: { value: dpr },
      uLineColor: { value: [1, 1, 1] },
      uBaseColor: { value: [0.32, 0.32, 0.32] },
      uIntensity: { value: 1 },
      uShineSize: { value: 0.17 },
      uShineFade: { value: 0.7 },
      uThickness: { value: 1 },
      uBaseWidth: { value: dpr },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });
  effect.appendChild(gl.canvas);

  const dimensions = { width: 1, height: 1 };
  const resize = () => {
    const rect = element.getBoundingClientRect();
    dimensions.width = rect.width;
    dimensions.height = rect.height;
    renderer.setSize(rect.width + padding * 2, rect.height + padding * 2);
    program.uniforms.uCenter.value = [
      (padding + rect.width / 2) * dpr,
      (padding + rect.height / 2) * dpr,
    ];
    program.uniforms.uHalfSize.value = [
      (rect.width / 2) * dpr,
      (rect.height / 2) * dpr,
    ];
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(element);
  resize();

  let pointerAngle = null;
  let proximityAmount = 0;
  const onPointerMove = (event) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const distanceY = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const distance = Math.hypot(distanceX, distanceY);

    if (distance === 0) {
      const normalizedX = (event.clientX - centerX) / (rect.width / 2);
      const normalizedY = (centerY - event.clientY) / (rect.height / 2);
      pointerAngle =
        Math.atan2(2 / rect.height, -2 / rect.width) +
        normalizedX * 0.3 +
        normalizedY * 0.15;
    } else {
      pointerAngle = Math.atan2(centerY - event.clientY, event.clientX - centerX);
    }

    const amount = Math.max(0, 1 - distance / Math.max(props.proximity, 1));
    proximityAmount = amount * amount * (3 - 2 * amount);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lineColor = new Color();
  const baseColor = new Color();
  let angle = 2.4;
  let idleAngle = 2.4;
  let brightness = 0;
  let previousTime = performance.now();
  let animationFrame = 0;

  const update = (time) => {
    animationFrame = requestAnimationFrame(update);
    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;

    if (!reducedMotion.matches) idleAngle += props.speed * delta;
    const followsPointer =
      props.followMouse &&
      pointerAngle !== null &&
      (!props.autoAnimate || proximityAmount > 0);
    const targetAngle = followsPointer ? pointerAngle : idleAngle;
    const difference =
      ((targetAngle - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    angle += difference * (1 - Math.exp(-delta * 7));

    const targetBrightness = props.autoAnimate ? 1 : proximityAmount;
    brightness += (targetBrightness - brightness) * (1 - Math.exp(-delta * 8));

    lineColor.set(props.lineColor);
    baseColor.set(props.baseColor);
    program.uniforms.uAngle.value = angle;
    program.uniforms.uRadius.value =
      Math.min(props.radius, Math.min(dimensions.width, dimensions.height) / 2) * dpr;
    program.uniforms.uLineColor.value = [lineColor.r, lineColor.g, lineColor.b];
    program.uniforms.uBaseColor.value = [baseColor.r, baseColor.g, baseColor.b];
    program.uniforms.uIntensity.value = props.intensity * brightness;
    program.uniforms.uShineSize.value = (props.shineSize * Math.PI) / 180;
    program.uniforms.uShineFade.value = (props.shineFade * Math.PI) / 180;
    program.uniforms.uThickness.value = props.thickness * dpr;
    renderer.render({ scene: mesh });
  };

  animationFrame = requestAnimationFrame(update);
  disposeEffect = () => {
    cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    if (gl.canvas.parentNode === effect) effect.removeChild(gl.canvas);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
});

onUnmounted(() => disposeEffect?.());
</script>

<template>
  <component
    :is="tagName"
    ref="elementRef"
    class="specular-button"
    :style="buttonStyle"
    v-bind="rootAttrs"
  >
    <span ref="effectRef" class="specular-button__effect" aria-hidden="true" />
    <span class="specular-button__content"><slot>Get Started</slot></span>
  </component>
</template>

<style scoped>
.specular-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: var(--sb-padding-y) var(--sb-padding-x);
  border: 0;
  border-radius: var(--sb-radius);
  outline: none;
  background: color-mix(
    in srgb,
    var(--sb-tint) var(--sb-tint-strength),
    transparent
  );
  color: var(--sb-text-color);
  font: inherit;
  font-size: var(--sb-font-size);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  overflow: visible;
  backdrop-filter: blur(var(--sb-blur));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 8px 24px rgb(0 0 0 / 25%);
  transition:
    transform 150ms ease,
    color 180ms ease,
    background 180ms ease;
}
.specular-button:active {
  transform: scale(0.97);
}
.specular-button[aria-disabled="true"],
.specular-button:disabled {
  cursor: default;
  opacity: 0.55;
}
.specular-button[aria-disabled="true"]:active,
.specular-button:disabled:active {
  transform: none;
}
.specular-button__effect {
  position: absolute;
  z-index: 0;
  inset: -20px;
  pointer-events: none;
}
.specular-button__effect :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
.specular-button__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  gap: inherit;
}
</style>
