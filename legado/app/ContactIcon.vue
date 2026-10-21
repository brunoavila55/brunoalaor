<script setup>
import { Mail } from "@lucide/vue";

defineProps({ name: { type: String, required: true } });

const icons = {
  linkedin: "/contact-icons/linkedin-in.svg",
  github: "/contact-icons/github.svg",
  whatsapp: "/contact-icons/whatsapp.svg",
};
</script>

<template>
  <Mail v-if="name === 'email'" :size="18" aria-hidden="true" />
  <span
    v-else-if="icons[name]"
    class="contact-brand-icon"
    :style="{ maskImage: `url(${icons[name]})` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.contact-brand-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
