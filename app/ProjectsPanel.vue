<script setup>
import { computed } from "vue";
import { FolderGit2, ArrowUpRight } from "@lucide/vue";
import { projects } from "./content";
import ContactIcon from "./ContactIcon.vue";

const publishedProjects = computed(() =>
  projects.filter((project) => !project.demo),
);
const safeLink = (url) => (/^https:\/\//i.test(url || "") ? url : null);
</script>

<template>
  <section
    id="projects"
    class="projects-showcase page-section"
    tabindex="-1"
    aria-labelledby="projects-title"
  >
    <div class="section-heading">
      <h2 id="projects-title"><FolderGit2 :size="17" /> Projetos</h2>
      <span class="section-note">SOLUÇÕES EM PRÁTICA</span>
    </div>
    <article
      v-for="project in publishedProjects"
      :key="project.id"
      class="panel showcase-card"
      :aria-labelledby="`project-${project.id}-title`"
    >
      <div class="showcase-heading">
        <span class="section-kicker">PROJETO AUTORAL</span>
        <span v-if="project.status" class="showcase-status">{{
          project.status
        }}</span>
      </div>
      <h3 :id="`project-${project.id}-title`">{{ project.name }}</h3>
      <p class="showcase-subtitle">{{ project.subtitle }}</p>
      <p class="showcase-description">{{ project.description }}</p>
      <ul class="showcase-features" aria-label="Funcionalidades">
        <li v-for="feature in project.features" :key="feature">
          {{ feature }}
        </li>
      </ul>
      <div v-if="project.impact" class="showcase-impact">
        <h4>Na operação do provedor</h4>
        <p>{{ project.impact }}</p>
      </div>
      <div class="showcase-footer">
        <ul class="showcase-stack" aria-label="Tecnologias utilizadas">
          <li v-for="technology in project.stack" :key="technology">
            {{ technology }}
          </li>
        </ul>
        <a
          v-if="safeLink(project.sourceUrl)"
          class="button button-outline showcase-link"
          :href="safeLink(project.sourceUrl)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Ver ${project.name} no GitHub`"
        >
          <ContactIcon name="github" />
          Ver no GitHub
          <ArrowUpRight :size="15" aria-hidden="true" />
        </a>
      </div>
    </article>
  </section>
</template>

<style scoped>
.showcase-card {
  padding: 24px;
}
.showcase-card + .showcase-card {
  margin-top: 16px;
}
.showcase-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.showcase-status {
  border: 1px solid var(--border-accent);
  border-radius: 4px;
  background: var(--surface-selected);
  padding: 5px 9px;
  font-size: 10px;
  color: var(--accent);
}
.showcase-card h3 {
  margin-top: 16px;
  font: 500 30px/1.2 var(--font-display);
  color: var(--foreground);
}
.showcase-subtitle {
  margin-top: 6px;
  font-size: 12px;
  color: var(--accent);
}
.showcase-description {
  margin-top: 16px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--text);
}
.showcase-features,
.showcase-stack {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  gap: 8px;
}
.showcase-features {
  margin-top: 16px;
  font-size: 10px;
  color: var(--muted);
}
.showcase-features li {
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 6px 9px;
}
.showcase-impact {
  margin-top: 20px;
  padding: 14px 16px;
  border-left: 2px solid var(--accent);
  background: var(--surface-tint);
}
.showcase-impact h4 {
  font-size: 11px;
  font-weight: 500;
  color: var(--foreground);
}
.showcase-impact p {
  font-size: 11px;
  line-height: 1.8;
  color: var(--muted);
  margin-top: 5px;
}
.showcase-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}
.showcase-stack {
  margin: 0;
  gap: 14px;
  font-size: 10px;
  color: var(--muted);
}
.showcase-link {
  gap: 10px;
  min-height: 42px;
}
@media (max-width: 600px) {
  .showcase-card {
    padding: 18px;
  }
  .showcase-link {
    width: 100%;
  }
}
</style>
