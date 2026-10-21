<script setup>
import { Folder, Server, Activity } from "@lucide/vue";
import { workProjects } from "./content";
</script>

<template>
  <section
    v-if="workProjects.length"
    class="work-projects"
    aria-label="Projetos no trabalho"
  >
    <div class="section-heading">
      <h2><Folder :size="17" /> Projetos no trabalho</h2>
    </div>
    <div class="work-project-list">
      <article
        v-for="project in workProjects"
        :key="project.id"
        class="panel work-project"
      >
        <span class="work-project-icon" aria-hidden="true"
          ><Server
            v-if="project.icon === 'infrastructure'"
            :size="22"
            :stroke-width="1.5" /><Activity
            v-else
            :size="22"
            :stroke-width="1.5"
        /></span>
        <div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style>
.work-projects {
  margin-top: 29px;
  margin-bottom: 29px;
}
.work-projects:first-child {
  margin-top: 0;
}
.work-project-list {
  display: grid;
  gap: 12px;
}
.work-project {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px;
}
.work-project-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 45px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: #ffffff03;
  color: var(--muted);
}
.work-project h3 {
  font: 500 17px/1.4 var(--font-display);
  color: var(--foreground);
}
.work-project p {
  margin-top: 9px;
  font-size: 12px;
  line-height: 1.9;
  color: var(--muted);
}
@media (max-width: 600px) {
  .work-project {
    padding: 17px;
    gap: 12px;
  }
  .work-project-icon {
    width: 32px;
    height: 36px;
  }
  .work-project h3 {
    font-size: 16px;
  }
}
</style>
