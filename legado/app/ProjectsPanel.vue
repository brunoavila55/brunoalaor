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
    <article
      v-for="(project, index) in publishedProjects"
      :key="project.id"
      class="panel showcase-card"
      :aria-labelledby="`project-${project.id}-title`"
    >
      <div v-if="index === 0" class="section-heading">
        <h2 id="projects-title"><FolderGit2 :size="17" /> Projetos</h2>
        <span class="section-note">SOLUÇÕES EM PRÁTICA</span>
      </div>
      <div class="showcase-heading">
        <span class="section-kicker">PROJETO AUTORAL</span>
        <span v-if="project.status" class="showcase-status">{{
          project.status
        }}</span>
      </div>
      <h3 :id="`project-${project.id}-title`">{{ project.name }}</h3>
      <p class="showcase-subtitle reading-column">{{ project.subtitle }}</p>
      <p class="showcase-description reading-column">
        {{ project.description }}
      </p>
      <ul class="showcase-features" aria-label="Funcionalidades">
        <li v-for="feature in project.features" :key="feature">
          {{ feature }}
        </li>
      </ul>
      <div v-if="project.impact" class="showcase-impact">
        <h4>Na operação do provedor</h4>
        <p class="reading-column reading-column--compact">
          {{ project.impact }}
        </p>
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
  padding: var(--space-6);
}
.showcase-card + .showcase-card {
  margin-top: var(--space-4);
}
.showcase-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.showcase-status {
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-sm);
  background: var(--surface-selected);
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  color: var(--accent);
}
.showcase-card h3 {
  margin-top: var(--space-4);
  font: 500 var(--text-4xl) / 1.2 var(--font-display);
  color: var(--foreground);
}
.showcase-subtitle {
  margin-top: var(--space-2);
  font-size: var(--text-base);
  color: var(--accent);
}
.showcase-description {
  margin-top: var(--space-4);
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--text);
}
.showcase-features,
.showcase-stack {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  gap: var(--space-2);
}
.showcase-features {
  margin-top: var(--space-4);
  font-size: var(--text-xs);
  color: var(--muted);
}
.showcase-features li {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
}
.showcase-impact {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border-left: 2px solid var(--accent);
  background: var(--surface-tint);
}
.showcase-impact h4 {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--foreground);
}
.showcase-impact p {
  font-size: var(--text-sm);
  line-height: 1.65;
  color: var(--muted);
  margin-top: var(--space-1);
}
.showcase-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}
.showcase-stack {
  margin: 0;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--muted);
}
.showcase-link {
  gap: var(--space-3);
  min-height: 42px;
}
@media (max-width: 600px) {
  .showcase-card {
    padding: var(--space-4);
  }
  .showcase-link {
    width: 100%;
  }
}
</style>
