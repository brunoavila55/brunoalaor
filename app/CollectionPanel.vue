<script setup>
import { computed, ref, watch } from "vue";
import { Server, ArrowUpRight, ChevronRight } from "@lucide/vue";
import { skills } from "./content";
import SkillIcon from "./SkillIcon.vue";

const category = ref("Todas");
const categories = computed(() => [
  "Todas",
  ...new Set(skills.map((skill) => skill.category)),
]);
const visibleSkills = computed(() =>
  skills.filter(
    (skill) => category.value === "Todas" || skill.category === category.value,
  ),
);
const selectedSkill = ref(skills[0] || null);
watch(category, () => {
  if (
    !visibleSkills.value.some((skill) => skill.id === selectedSkill.value?.id)
  )
    selectedSkill.value = visibleSkills.value[0] || null;
});
const safeLink = (url) => (/^https:\/\//i.test(url || "") ? url : null);
</script>

<template>
  <section
    id="skills"
    class="professional-section page-section"
    tabindex="-1"
    aria-labelledby="skills-title"
  >
    <div class="panel skills-panel">
      <div class="section-heading">
        <h2 id="skills-title"><Server :size="17" /> Competências</h2>
        <span class="section-note">CONHECIMENTOS TÉCNICOS</span>
      </div>
      <div class="professional-intro reading-column">
        <span class="section-kicker">TECNOLOGIAS E MÉTODOS</span>
        <h3>Conhecimento aplicado à infraestrutura.</h3>
        <p>
          Sistemas, virtualização, redes, monitoramento e dados na prática.
          Selecione uma competência para conhecer minha atuação.
        </p>
      </div>
      <div
        class="skill-filters"
        role="group"
        aria-label="Filtrar competências por categoria"
      >
        <button
          v-for="option in categories"
          :key="option"
          :class="{ active: category === option }"
          :aria-pressed="category === option"
          @click="category = option"
        >
          {{ option }}
        </button>
      </div>
      <p class="skill-count" aria-live="polite">
        {{ visibleSkills.length }}
        {{ visibleSkills.length === 1 ? "competência" : "competências" }}
      </p>
      <div class="skills-layout">
        <div
          class="skill-list"
          role="group"
          aria-label="Competências disponíveis"
        >
          <button
            v-for="skill in visibleSkills"
            :key="skill.id"
            class="skill-row"
            :class="{ selected: selectedSkill?.id === skill.id }"
            :aria-pressed="selectedSkill?.id === skill.id"
            aria-controls="skill-detail"
            @click="selectedSkill = skill"
          >
            <span class="skill-icon" aria-hidden="true"
              ><SkillIcon :name="skill.id" /></span
            ><span class="skill-row-label"
              ><strong>{{ skill.name }}</strong
              ><small>{{ skill.kind }}</small></span
            ><ChevronRight :size="14" />
          </button>
          <p v-if="!visibleSkills.length" class="professional-empty">
            Nenhuma competência nesta categoria.
          </p>
        </div>
        <div
          id="skill-detail"
          class="skill-details"
          aria-live="polite"
          aria-atomic="true"
        >
          <article
            v-for="skill in skills"
            :key="skill.id"
            class="skill-detail"
            :class="{ active: selectedSkill?.id === skill.id }"
            :aria-hidden="selectedSkill?.id !== skill.id"
            :inert="selectedSkill?.id !== skill.id"
          >
            <div class="skill-detail-heading">
              <span class="section-kicker">{{ skill.category }}</span
              ><span v-if="skill.demo" class="sample-label">EXEMPLO</span>
            </div>
            <div class="skill-detail-title">
              <h4>{{ skill.name }}</h4>
            </div>
            <p class="reading-column reading-column--compact">
              {{ skill.description }}
            </p>
            <div class="skill-applications">
              <h5>Aplicações e conhecimentos</h5>
              <ul>
                <li v-for="use in skill.uses" :key="use">{{ use }}</li>
              </ul>
            </div>
            <div class="skill-evidence">
              <h5>Experiência prática</h5>
              <p class="reading-column reading-column--compact">
                {{ skill.evidence }}
              </p>
            </div>
            <a
              v-if="safeLink(skill.projectUrl)"
              class="text-button"
              :href="safeLink(skill.projectUrl)"
              target="_blank"
              rel="noopener noreferrer"
              >Conhecer projeto relacionado <ArrowUpRight :size="14"
            /></a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.professional-intro {
  margin: var(--space-1) 0 var(--space-6);
}
.professional-intro h3 {
  font: 500 var(--text-3xl) / 1.35 var(--font-display);
  letter-spacing: -0.5px;
  margin: var(--space-3) 0;
  color: var(--foreground);
  max-width: none;
  white-space: nowrap;
}
.professional-intro > p {
  font-size: var(--text-base);
  color: var(--muted);
  max-width: 460px;
  line-height: 1.65;
}
.skill-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-4);
}
.skill-filters button {
  background: transparent;
  border: 1px solid transparent;
  padding: var(--space-2) var(--space-3);
  color: var(--muted);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  min-height: 34px;
}
.skill-filters button.active {
  background: var(--surface-selected);
  color: var(--foreground);
  border-color: var(--border-accent);
}
.skill-filters button:hover {
  background: var(--surface-raised);
  color: var(--foreground);
}
.skill-count {
  margin: var(--space-4) 0 var(--space-3);
  font-size: var(--text-xs);
  color: var(--muted);
}
.skills-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  align-items: stretch;
}
.skill-list {
  display: grid;
  grid-auto-rows: 1fr;
  gap: var(--space-2);
}
.skill-row {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 63px;
  gap: var(--space-3);
  text-align: left;
  padding: var(--space-3);
  background: var(--surface-tint);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
.skill-row.selected {
  border-color: var(--accent);
  background: #1e3a52;
}
.skill-row:hover {
  background: var(--surface-raised);
}
.skill-icon {
  display: grid;
  place-items: center;
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  color: var(--accent);
}
.skill-row-label {
  flex: 1;
  min-width: 0;
}
.skill-row strong {
  font-size: var(--text-base);
  line-height: 1.4;
  font-weight: 500;
  display: block;
  overflow-wrap: anywhere;
}
.skill-row small {
  font-size: var(--text-2xs);
  color: var(--muted);
  margin-top: var(--space-1);
  display: block;
}
.skill-row > svg {
  color: var(--accent);
}
.skill-details {
  display: grid;
  min-width: 0;
}
.skill-detail {
  /* Todos os textos reservam espaço na mesma célula para evitar saltos ao selecionar. */
  grid-area: 1 / 1;
  background: #1e3a52;
  border: 1px solid var(--border);
  padding: var(--space-5);
  border-radius: var(--radius-md);
  min-width: 0;
}
.skill-detail:not(.active) {
  visibility: hidden;
  pointer-events: none;
}
.skill-detail-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.skill-detail-title {
  margin: var(--space-4) 0;
}
.skill-detail h4 {
  font: 500 var(--text-3xl) var(--font-display);
  margin: 0;
  color: var(--foreground);
  overflow-wrap: anywhere;
  min-width: 0;
}
.skill-detail > p,
.skill-evidence p {
  font-size: var(--text-sm);
  line-height: 1.65;
  color: var(--muted);
}
.skill-applications {
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}
.skill-detail h5 {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text);
  margin: 0 0 var(--space-3);
}
.skill-detail ul {
  padding-left: var(--space-4);
  margin: 0;
  color: var(--muted);
  font-size: var(--text-xs);
  line-height: 1.9;
}
.skill-detail li {
  margin-top: var(--space-1);
}
.skill-detail li::marker {
  color: var(--accent);
}
.skill-evidence {
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}
.skill-detail > .text-button {
  margin-top: var(--space-4);
}
@media (max-width: 1050px) {
  .skills-layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .skill-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .skill-row {
    gap: var(--space-2);
    padding: var(--space-3);
  }
}
@media (max-width: 800px) and (min-width: 601px) {
  .professional-intro h3 {
    max-width: 430px;
    white-space: normal;
  }
  .skill-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 600px) {
  .professional-intro h3 {
    font-size: var(--text-2xl);
    white-space: normal;
  }
  .skill-filters button {
    font-size: var(--text-2xs);
    padding: var(--space-2);
    min-height: 36px;
  }
  .skill-row strong {
    font-size: var(--text-sm);
  }
  .skill-row .skill-icon {
    width: 29px;
    height: 33px;
  }
  .skill-row > svg {
    display: none;
  }
}
@media (max-width: 375px) {
  .skill-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  .professional-section button {
    transition: none;
  }
}
</style>
