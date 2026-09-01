<script setup>
import { computed, defineAsyncComponent, onMounted } from "vue";
import {
  ArrowUpRight,
  Award,
  Compass,
  Mail,
  MapPin,
  Laptop,
} from "@lucide/vue";
import { profile } from "./content";
import CareerPanel from "./CareerPanel.vue";
import CollectionPanel from "./CollectionPanel.vue";
import ProjectsPanel from "./ProjectsPanel.vue";
import ContactIcon from "./ContactIcon.vue";
import SpecularButton from "./SpecularButton.vue";

const ColorBends = defineAsyncComponent(() => import("./ColorBends.vue"));

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
  <ColorBends
    class="site-color-bends"
    :colors="['#2f89a8', '#647da8', '#bd9f67']"
    :rotation="100"
    :speed="0.2"
    :scale="1"
    :frequency="1"
    :warp-strength="1"
    :mouse-influence="0.9"
    :noise="0.06"
    :parallax="0.42"
    :iterations="2"
    :intensity="1.5"
    :band-width="6"
    transparent
  />
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
          <SpecularButton
            v-for="contact in contacts"
            :key="contact.id"
            class="profile-contact-link"
            size="sm"
            :radius="6"
            tint="#1e3a52"
            :tint-opacity="0.2"
            text-color="#e9f0f7"
            line-color="#bd9f67"
            base-color="#a7867f"
            :intensity="1.35"
            :shine-size="12"
            :shine-fade="34"
            :thickness="1"
            :speed="0.35"
            follow-mouse
            :proximity="180"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
            :title="contact.detail || contact.label"
          >
            <ContactIcon :name="contact.id" />
            <span>{{ contact.label }}</span>
            <ArrowUpRight :size="12" aria-hidden="true" />
          </SpecularButton>
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
          <div class="about-content reading-column">
            <p v-for="paragraph in profile.bio" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
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
          <p class="reading-column reading-column--compact">
            Comprometido, pontual e proativo, com facilidade de adaptação e
            aprendizado contínuo. Organizado, atento a detalhes e responsável,
            trabalha bem tanto sozinho quanto em equipe, sempre buscando
            qualidade nos resultados.
          </p>
        </section>
        <section class="panel stack-card">
          <div class="sidebar-heading">
            <h2>Certificações</h2>
            <Award :size="16" />
          </div>
          <p class="sidebar-subtitle">Formação e aprendizado contínuo.</p>
          <div class="sidebar-certifications">
            <article class="certification-item">
              <img
                src="/certifications/lfs101.png"
                alt="LFS101 — Introduction to Linux, The Linux Foundation"
                width="340"
                height="340"
              />
              <div>
                <strong>LFS101</strong>
                <span>Introduction to Linux</span>
                <small>The Linux Foundation</small>
              </div>
            </article>
          </div>
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
