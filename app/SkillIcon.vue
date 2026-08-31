<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 24 },
});

const icons = {
  linux: "/skills/linux.svg",
  docker: "/skills/docker.svg",
  proxmox: "/skills/proxmox.svg",
  networks: "/skills/networkx.svg",
  observability: "/skills/azure-metrics.svg",
  postgresql: "/skills/postgresql.svg",
};
</script>

<template>
  <img
    v-if="icons[name]"
    class="technology-icon"
    :src="icons[name]"
    :width="size"
    :height="size"
    alt=""
    aria-hidden="true"
    draggable="false"
  />
</template>

<style scoped>
.technology-icon {
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
