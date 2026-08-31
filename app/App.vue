<script setup>
import { computed, onMounted } from "vue";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  BriefcaseBusiness,
  Compass,
  Mail,
  MapPin,
  Laptop,
} from "@lucide/vue";
import { profile, career, skills } from "./content";
import CareerPanel from "./CareerPanel.vue";
import CollectionPanel from "./CollectionPanel.vue";
import ProjectsPanel from "./ProjectsPanel.vue";
import SkillIcon from "./SkillIcon.vue";
import ContactIcon from "./ContactIcon.vue";

const currentJob = computed(() =>
  career.find((job) => job.status === "current"),
);
const safeLink = (url) => (/^https:\/\//i.test(url ?? "") ? url : null);
const emailLink = computed(() =>
  /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(profile.email)
    ? `mailto:${profile.email}`
    : null,
);
const whatsappLink = computed(() => {
  const number = (profile.whatsapp || "").replace(/\D/g, "");
  return /^\d{10,15}$/.test(number) ? `https://wa.me/${number}` : null;
});
const contacts = computed(() =>
  [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: safeLink(profile.linkedin),
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: safeLink(profile.github),
      external: true,
    },
    {
      id: "email",
      label: "E-mail",
      href: emailLink.value,
      detail: profile.email,
      external: false,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: whatsappLink.value,
      detail: profile.whatsapp,
      external: true,
    },
  ].filter((contact) => contact.href),
);
onMounted(() => {
  const hash = window.location.hash.slice(1);
  if (["about", "skills", "projects", "career", "contact"].includes(hash)) {
    document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
  }
});
</script>

<template>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
  <main id="main" class="page-shell">
    <section class="profile" :aria-label="`Perfil de ${profile.name}`">
      <div class="profile-cover">
        <div class="cover-caption">
          <span class="tiny-cross">+</span> TECNOLOGIA. CLAREZA. RESULTADOS.
        </div>
        <span class="cover-coordinate"
          >EST. 2026 <span> / </span> PORTFÓLIO PROFISSIONAL</span
        >
      </div>
      <div class="profile-body">
        <div class="avatar-wrap">
          <div class="avatar" :aria-label="`Foto de ${profile.name}`">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              :alt="profile.name"
            />
            <img
              v-else
              class="avatar-logo"
              src="/brand/logo-on-dark.svg"
              :alt="`Logo de ${profile.name}`"
              width="80"
              height="80"
            />
          </div>
        </div>
        <div class="profile-info">
          <div class="eyebrow">PORTFÓLIO PROFISSIONAL</div>
          <h1>{{ profile.name }}<span class="name-dot">.</span></h1>
          <p class="profile-role">{{ profile.role }}</p>
          <p class="profile-intro">{{ profile.intro }}</p>
          <div class="profile-details">
            <span><MapPin :size="13" /> {{ profile.location }}</span
            ><span v-if="profile.availability" class="profile-availability"
              ><Laptop :size="14" /> {{ profile.availability }}</span
            >
          </div>
        </div>
        <nav
          id="contact"
          class="profile-actions"
          aria-label="Redes sociais e contato"
          tabindex="-1"
        >
          <a
            v-for="contact in contacts"
            :key="contact.id"
            class="profile-contact-link"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
            :title="contact.detail || contact.label"
          >
            <ContactIcon :name="contact.id" />
            <span>{{ contact.label }}</span>
            <ArrowUpRight :size="12" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </section>

    <div class="content-grid">
      <div id="main-content" class="main-column">
        <section
          id="about"
          class="panel about-panel page-section"
          tabindex="-1"
          aria-labelledby="about-title"
        >
          <div class="section-heading">
            <h2 id="about-title"><Compass :size="17" /> Sobre mim</h2>
            <span class="section-note">APRESENTAÇÃO</span>
          </div>
          <p v-for="paragraph in profile.bio" :key="paragraph">
            {{ paragraph }}
          </p>
        </section>
        <CollectionPanel />
        <ProjectsPanel />
        <CareerPanel id="career" class="page-section" tabindex="-1" />
      </div>
      <aside class="sidebar" aria-label="Resumo profissional">
        <section class="panel professional-card">
          <div class="sidebar-heading">
            <h2>Perfil profissional</h2>
            <Compass :size="16" />
          </div>
          <p>{{ profile.summary }}</p>
          <template v-if="currentJob">
            <div class="sidebar-divider" />
            <div class="currently-label">ATUAÇÃO ATUAL</div>
            <div class="currently">
              <span class="currently-icon"
                ><BriefcaseBusiness :size="21"
              /></span>
              <div>
                <strong>{{ currentJob.role }}</strong
                ><span>{{ currentJob.company }}</span>
              </div>
            </div>
            <span v-if="currentJob.demo" class="sample-label sidebar-demo"
              >EXPERIÊNCIA DE EXEMPLO</span
            >
          </template>
          <a class="text-button" href="#about"
            >Mais sobre mim <ArrowRight :size="15"
          /></a>
        </section>
        <section class="panel stack-card">
          <div class="sidebar-heading">
            <h2>Competências técnicas</h2>
            <Code2 :size="16" />
          </div>
          <p class="sidebar-subtitle">
            {{ skills.length }} competências{{
              skills.some((item) => item.demo) ? " · exemplos" : " cadastradas"
            }}.
          </p>
          <div class="sidebar-skills">
            <span
              v-for="item in skills"
              :key="item.id"
              :title="item.name"
              role="img"
              :aria-label="item.name"
              ><SkillIcon :name="item.id" :size="24"
            /></span>
          </div>
          <a class="text-button" href="#skills"
            >Ver competências <ArrowRight :size="15"
          /></a>
        </section>
        <section class="connect-card">
          <span class="connect-icon"><Mail :size="21" /></span>
          <h2>Vamos conversar?</h2>
          <p>
            Entre em contato para conversar sobre oportunidades profissionais.
          </p>
          <a class="button button-outline" href="#contact"
            >Entrar em contato <ArrowUpRight :size="16"
          /></a>
        </section>
        <div class="sidebar-footnote">PORTFÓLIO PROFISSIONAL</div>
      </aside>
    </div>
    <footer class="site-footer">
      <a
        class="footer-brand"
        href="#main"
        :aria-label="`${profile.name}, início`"
        ><img src="/brand/logo-on-dark.svg" alt="" width="24" height="28"
      /></a>
      <p>
        © {{ new Date().getFullYear() }} {{ profile.name }} <span>·</span> Em
        constante evolução.
      </p>
      <span>DESENVOLVIDO COM VUE 3</span
      ><a href="#" aria-label="Voltar ao topo">Voltar ao topo ↑</a>
    </footer>
  </main>
</template>
