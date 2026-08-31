<script setup>
import { computed } from "vue";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  Info,
} from "@lucide/vue";
import { career } from "./content";

const current = computed(() => career.find((job) => job.status === "current"));
const previous = computed(() =>
  career.filter((job) => job.status === "previous"),
);
</script>

<template>
  <section class="experience-view" aria-labelledby="experience-title">
    <div class="section-heading">
      <h2 id="experience-title">
        <BriefcaseBusiness :size="17" /> Experiência profissional
      </h2>
      <span class="section-note">TRAJETÓRIA</span>
    </div>
    <article v-if="current" class="panel current-position">
      <div class="position-heading">
        <span class="section-kicker">ATUAÇÃO ATUAL</span
        ><span v-if="current.demo" class="sample-label">EXEMPLO</span>
      </div>
      <div class="position-identity">
        <img
          v-if="current.companyLogo"
          class="company-logo"
          :src="current.companyLogo"
          :alt="`Logo da ${current.company}`"
          width="400"
          height="224"
        />
        <span v-else class="company-icon"
          ><Building2 :size="25" :stroke-width="1.5"
        /></span>
        <div>
          <h3>{{ current.role }}</h3>
          <p>{{ current.company }}</p>
        </div>
      </div>
      <p class="position-period">
        <CalendarDays :size="13" /> {{ current.period }}
        <span v-if="current.location">· {{ current.location }}</span>
      </p>
      <p class="position-description">{{ current.description }}</p>
      <div v-if="current.focus" class="position-focus">
        <h4>Área de atuação</h4>
        <p>{{ current.focus }}</p>
      </div>
      <div v-if="current.highlights.length" class="position-highlights">
        <h4>Responsabilidades e contribuições</h4>
        <ul>
          <li v-for="highlight in current.highlights" :key="highlight.id">
            <strong>{{ highlight.title }}</strong>
            <p>{{ highlight.description }}</p>
          </li>
        </ul>
      </div>
    </article>
    <p v-else class="panel professional-empty">
      A experiência profissional atual será adicionada aqui.
    </p>

    <section class="previous-positions" aria-labelledby="previous-title">
      <div class="section-heading">
        <h2 id="previous-title">Experiências anteriores</h2>
      </div>
      <div class="experience-timeline">
        <article
          v-for="job in previous"
          :key="job.id"
          class="panel previous-position"
        >
          <div class="position-heading">
            <span class="position-period">{{ job.period }}</span
            ><span v-if="job.demo" class="sample-label">EXEMPLO</span>
          </div>
          <div class="previous-identity">
            <img
              v-if="job.companyLogo"
              class="company-logo"
              :src="job.companyLogo"
              :alt="`Logo da ${job.company}`"
              width="400"
              height="224"
            />
            <div>
              <h3>{{ job.role }}</h3>
              <p class="previous-company">
                <Building2 v-if="!job.companyLogo" :size="12" />
                {{ job.company }}
                <span v-if="job.location">· {{ job.location }}</span>
              </p>
            </div>
          </div>
          <p class="position-description">{{ job.description }}</p>
          <details v-if="job.highlights.length" class="position-details">
            <summary>
              Responsabilidades e contribuições <ChevronDown :size="15" />
            </summary>
            <ul class="previous-highlights">
              <li v-for="highlight in job.highlights" :key="highlight.id">
                <strong>{{ highlight.title }}</strong>
                <p>{{ highlight.description }}</p>
              </li>
            </ul>
          </details>
        </article>
      </div>
      <p v-if="!previous.length" class="panel professional-empty">
        As experiências anteriores serão adicionadas aqui.
      </p>
    </section>
    <p v-if="career.some((job) => job.demo)" class="professional-disclaimer">
      <Info :size="15" /><span
        >Somente os registros marcados como exemplo ainda aguardam as
        informações reais.</span
      >
    </p>
  </section>
</template>

<style>
.current-position {
  padding: 20px;
  border-top: 2px solid var(--accent);
}
.current-position .position-heading {
  margin-bottom: 14px;
}
.position-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 22px;
}
.position-identity,
.previous-identity {
  display: flex;
  gap: 15px;
  align-items: center;
}
.position-identity > div,
.previous-identity > div {
  min-width: 0;
}
.company-logo {
  display: block;
  width: 92px;
  height: 52px;
  object-fit: contain;
  flex-shrink: 0;
}
.company-icon {
  display: grid;
  place-items: center;
  width: 53px;
  height: 53px;
  flex-shrink: 0;
  background: var(--surface-selected);
  border: 1px solid var(--border-accent);
  border-radius: 6px;
  color: var(--accent);
}
.position-identity h3 {
  font: 500 24px/1.3 var(--font-display);
  color: var(--foreground);
  overflow-wrap: anywhere;
}
.position-identity p {
  font-size: 12px;
  color: var(--text);
  margin-top: 5px;
}
.position-period {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  font-size: 10px;
  color: var(--muted);
  line-height: 1.6;
}
.current-position > .position-period {
  margin-top: 12px;
}
.position-description {
  font-size: 12px;
  line-height: 1.9;
  color: var(--text);
  margin-top: 17px;
}
.current-position > .position-description {
  margin-top: 12px;
  line-height: 1.7;
}
.position-focus {
  margin-top: 22px;
  padding: 16px 18px;
  border-left: 2px solid var(--border-accent);
  background: var(--surface-selected);
}
.position-focus h4,
.position-highlights > h4 {
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
}
.position-focus p {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.8;
  margin-top: 7px;
}
.position-highlights {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.position-highlights ul,
.previous-highlights {
  list-style: none;
  padding: 0;
  margin: 19px 0 0;
}
.position-highlights li,
.previous-highlights li {
  position: relative;
  padding-left: 17px;
  margin-top: 17px;
}
.position-highlights li::before,
.previous-highlights li::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 0;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}
.position-highlights strong,
.previous-highlights strong {
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
}
.position-highlights li p,
.previous-highlights li p {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.8;
  margin-top: 5px;
}
.position-highlights ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 16px 24px;
  margin-top: 14px;
}
.position-highlights li {
  margin-top: 0;
  padding-left: 12px;
}
.position-highlights li p {
  margin-top: 4px;
  line-height: 1.65;
}
.previous-positions {
  margin-top: 30px;
}
.experience-timeline {
  position: relative;
  padding-left: 20px;
  border-left: 1px solid var(--border);
  margin-left: 5px;
}
.previous-position {
  position: relative;
  margin-bottom: 14px;
  padding: 22px;
}
.previous-position::before {
  content: "";
  position: absolute;
  left: -25px;
  top: 28px;
  height: 7px;
  width: 7px;
  border: 1px solid var(--border-accent);
  background: var(--accent);
  border-radius: 50%;
}
.previous-position .position-heading {
  margin-bottom: 13px;
}
.previous-position h3 {
  font: 500 19px/1.3 var(--font-display);
  color: var(--foreground);
  overflow-wrap: anywhere;
}
.previous-company {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  font-size: 11px;
  color: var(--text);
  margin-top: 9px;
}
.position-details {
  margin-top: 18px;
  border-top: 1px solid var(--border);
}
.position-details summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  list-style: none;
  cursor: pointer;
  min-height: 45px;
  color: var(--text);
  font-size: 10px;
  padding-top: 4px;
}
.position-details summary::-webkit-details-marker {
  display: none;
}
.position-details summary:hover {
  color: var(--accent);
}
.position-details summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.position-details[open] summary svg {
  transform: rotate(180deg);
}
.position-details .previous-highlights {
  margin-top: 0;
}
@media (max-width: 800px) {
  .current-position,
  .previous-position {
    padding: 20px;
  }
  .position-identity {
    gap: 11px;
    align-items: flex-start;
  }
  .position-identity h3 {
    font-size: 21px;
  }
  .company-icon {
    width: 43px;
    height: 43px;
  }
  .company-logo {
    width: 76px;
    height: 43px;
  }
}
@media (max-width: 600px) {
  .current-position,
  .previous-position {
    padding: 18px;
  }
  .experience-timeline {
    padding-left: 14px;
  }
  .previous-position::before {
    left: -19px;
  }
  .position-identity h3 {
    font-size: 22px;
  }
  .position-focus {
    padding: 14px;
  }
}
</style>
