<script setup>
import { ref, computed, nextTick } from "vue";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Layers3,
  Command,
  Compass,
  GitBranch as Github,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  Circle,
  X,
  Check,
  Gamepad2,
  Heart,
  Coffee,
  Folder,
  BriefcaseBusiness as Linkedin,
} from "@lucide/vue";
import { profile, projects } from "./content";

const activeTab = ref("portfolio");
const filter = ref("Todos");
const categories = computed(() => [
  "Todos",
  ...new Set(projects.map((p) => p.category)),
]);
const shownProjects = computed(() =>
  projects.filter(
    (p) => filter.value === "Todos" || p.category === filter.value,
  ),
);
const selectedProject = ref(null);
const projectDialog = ref(null);
const contactDialog = ref(null);
const safeLink = (url) => (/^https:\/\//i.test(url ?? "") ? url : null);
const emailLink = computed(() =>
  /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(profile.email)
    ? `mailto:${profile.email}`
    : null,
);
const hasContacts = computed(
  () =>
    emailLink.value || safeLink(profile.github) || safeLink(profile.linkedin),
);
function selectTab(tab) {
  activeTab.value = tab;
}
async function showProjects() {
  selectTab("portfolio");
  await nextTick();
  document.getElementById("projects")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
function openProject(project) {
  selectedProject.value = project;
  projectDialog.value.showModal();
}
function contact() {
  contactDialog.value.showModal();
}
</script>

<template>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
  <main id="main" class="page-shell">
    <section class="profile" aria-label="Perfil de Bruno Alaor">
      <div class="profile-cover">
        <div class="cover-caption">
          <span class="tiny-cross">+</span> EXPLORAR. CRIAR. EVOLUIR.
        </div>
        <span class="cover-coordinate"
          >EST. 2026 <span> / </span> PORTFÓLIO V.01</span
        >
      </div>
      <div class="profile-body">
        <div class="avatar-wrap">
          <div class="avatar" aria-label="Avatar de Bruno Alaor">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              alt="Bruno Alaor"
            /><template v-else
              ><span>ba<span class="avatar-period">.</span></span
              ><Code2 :size="23" class="avatar-code"
            /></template>
          </div>
          <span class="avatar-status" title="Portfólio em construção" />
        </div>
        <div class="profile-info">
          <div class="eyebrow">OLÁ, MUNDO <span class="wave">✳</span></div>
          <h1>{{ profile.name }}<span class="name-dot">.</span></h1>
          <p class="profile-handle">
            @{{ profile.handle }} <span>·</span> {{ profile.tagline }}
          </p>
          <p class="profile-intro">{{ profile.intro }}</p>
          <div class="profile-details">
            <span><MapPin :size="13" /> {{ profile.location }}</span
            ><span><Code2 :size="14" /> {{ profile.role }}</span>
          </div>
        </div>
        <div class="profile-actions">
          <span class="creator-tag"><Command :size="15" /> MODO CRIADOR</span
          ><button class="button button-primary" @click="contact">
            Vamos conversar <ArrowUpRight :size="17" />
          </button>
        </div>
      </div>
    </section>

    <div class="content-grid">
      <div class="main-column">
        <template v-if="activeTab === 'portfolio'">
          <section
            v-if="projects.length"
            class="featured-section"
            aria-labelledby="featured-title"
          >
            <div class="section-heading">
              <h2 id="featured-title"><Sparkles :size="16" /> Em destaque</h2>
              <span class="section-note">PROJETO SELECIONADO</span>
            </div>
            <button class="featured-card" @click="openProject(projects[0])">
              <div class="featured-copy">
                <span class="project-kicker"
                  ><span class="status-dot" /> CONCEITO · APLICAÇÃO WEB</span
                >
                <div class="orbit-wordmark">
                  <Command :size="30" /><span>{{
                    projects[0].name.toLowerCase()
                  }}</span>
                </div>
                <h3>Grandes ideias.<br />Um espaço para começar.</h3>
                <p>
                  Organização que abre espaço<br />para o que realmente importa.
                </p>
                <span class="featured-link"
                  >Conhecer o projeto <ArrowUpRight :size="16"
                /></span>
              </div>
              <div class="orbit-preview" aria-hidden="true">
                <div class="mock-toolbar">
                  <span class="window-dots"><i /><i /><i /></span
                  ><span>orbit / workspace</span><span>↗</span>
                </div>
                <div class="mock-workspace">
                  <div class="mock-sidebar">
                    <Command :size="20" /><span class="mock-side-item active"
                      ><Layers3 :size="12" /> Visão geral</span
                    ><span class="mock-side-item"
                      ><Folder :size="12" /> Projetos</span
                    ><span class="mock-side-item"
                      ><Check :size="12" /> Tarefas</span
                    ><span class="mock-sidebar-bottom"
                      >SEU ESPAÇO, SUAS IDEIAS.</span
                    >
                  </div>
                  <div class="mock-main">
                    <span class="mock-greeting"
                      >QUARTA-FEIRA, 26 DE AGOSTO</span
                    >
                    <h4>Faça acontecer<span> ✳</span></h4>
                    <p>Um passo de cada vez. Você está indo bem.</p>
                    <div class="mock-stats">
                      <div>
                        <span>Em progresso</span><strong>08 <i>↗</i></strong>
                      </div>
                      <div>
                        <span>Concluídas</span><strong>24 <i>✓</i></strong>
                      </div>
                    </div>
                    <div class="mock-task-title">
                      Suas prioridades <span>+ Nova tarefa</span>
                    </div>
                    <div class="mock-task">
                      <span class="mock-checkbox done">✓</span> Explorar novas
                      ideias <small>Design</small>
                    </div>
                    <div class="mock-task">
                      <span class="mock-checkbox" /> Criar algo incrível
                      <small>Projeto</small>
                    </div>
                    <div class="mock-task">
                      <span class="mock-checkbox" /> Cuidar dos detalhes
                      <small>Dev</small>
                    </div>
                  </div>
                </div>
              </div>
              <span class="featured-number"
                >01 / {{ String(projects.length).padStart(2, "0") }}</span
              >
            </button>
          </section>
          <section
            id="projects"
            class="projects-section"
            aria-labelledby="projects-title"
          >
            <div class="section-heading">
              <h2 id="projects-title">
                <Folder :size="16" /> Coleção de projetos
                <span class="heading-count">{{
                  String(projects.length).padStart(2, "0")
                }}</span>
              </h2>
              <span class="section-note">EXPERIMENTAR FAZ PARTE</span>
            </div>
            <div class="filter-row" aria-label="Filtrar projetos">
              <button
                v-for="category in categories"
                :key="category"
                :class="{ active: filter === category }"
                :aria-pressed="filter === category"
                @click="filter = category"
              >
                {{ category }}</button
              ><span v-if="projects.some((p) => p.demo)" class="example-label"
                >Projetos demonstrativos</span
              >
            </div>
            <div class="project-grid" aria-live="polite">
              <button
                v-for="project in shownProjects"
                :key="project.id"
                class="project-card"
                @click="openProject(project)"
              >
                <div
                  class="project-art"
                  :class="project.color"
                  aria-hidden="true"
                >
                  <template v-if="project.id === 'orbit'"
                    ><span class="art-small-label">WORKSPACE / CONCEPT</span>
                    <div class="art-wordmark">
                      <Command :size="25" /> orbit<span class="art-wordmark-dot"
                        >✳</span
                      >
                    </div>
                    <span class="art-caption"
                      >Make room for your next idea.</span
                    >
                    <div class="art-ui-bar">
                      <span>TO DO</span><span>IN PROGRESS</span
                      ><span>DONE ✓</span>
                    </div></template
                  ><template v-else-if="project.id === 'nexus'"
                    ><span class="art-small-label"
                      >DISCOVER YOUR NEXT WORLD</span
                    >
                    <div class="nexus-title">nexus<span>®</span></div>
                    <div class="nexus-bottom">
                      <span><Gamepad2 :size="13" /> PLAY. EXPLORE. REPEAT.</span
                      ><ArrowUpRight :size="21" /></div></template
                  ><template v-else
                    ><span class="forma-menu"
                      >FORMA® <span>Independent design studio ↗</span></span
                    >
                    <div class="forma-title">
                      Less, but<br /><i>better.</i><span>✳</span>
                    </div>
                    <span class="forma-bottom"
                      >DESIGN WITH PURPOSE. <span>2026</span></span
                    ></template
                  >
                </div>
                <div class="project-card-body">
                  <span class="project-type">{{ project.type }}</span>
                  <h3>{{ project.name }} <ArrowUpRight :size="17" /></h3>
                  <p>{{ project.subtitle }}</p>
                  <div class="project-stack">
                    <span v-for="tech in project.stack" :key="tech">{{
                      tech
                    }}</span>
                  </div>
                </div>
              </button>
              <p v-if="!shownProjects.length" class="empty-state">
                Novos projetos aparecerão por aqui em breve.
              </p>
            </div>
          </section>
          <div class="build-note">
            <Terminal :size="17" />
            <p>
              <strong>Sempre em desenvolvimento.</strong> Novas ideias encontram
              espaço por aqui.
            </p>
            <span class="status-dot" />
          </div>
        </template>
        <section v-else-if="activeTab === 'about'" class="panel about-panel">
          <div class="section-heading">
            <h2><Compass :size="17" /> Por trás do perfil</h2>
            <span class="section-note">PLAYER ONE</span>
          </div>
          <span class="eyebrow">MUITO ALÉM DO CÓDIGO</span>
          <h2 class="large-heading">
            Curiosidade como<br />ponto de partida<span>.</span>
          </h2>
          <p v-for="paragraph in profile.bio" :key="paragraph">
            {{ paragraph }}
          </p>
          <div class="about-interest-grid">
            <div>
              <Code2 />
              <h3>Criar</h3>
              <p>Dar forma a ideias com código.</p>
            </div>
            <div>
              <Gamepad2 />
              <h3>Explorar</h3>
              <p>Encontrar inspiração em novos mundos.</p>
            </div>
            <div>
              <Coffee />
              <h3>Evoluir</h3>
              <p>Aprender algo novo a cada projeto.</p>
            </div>
          </div>
          <p class="editorial-note">
            Texto de apresentação inicial — personalize com sua história,
            experiência e interesses.
          </p>
        </section>
        <section v-else class="panel stack-panel">
          <div class="section-heading">
            <h2><Code2 :size="17" /> Inventário de tecnologias</h2>
            <span class="section-note">FERRAMENTAS DE CRIAÇÃO</span>
          </div>
          <h2 class="large-heading">
            As peças por trás<br />da experiência<span>.</span>
          </h2>
          <p>
            Este portfólio é construído com uma base simples, rápida e fácil de
            evoluir.
          </p>
          <div class="technology-list">
            <article>
              <span class="tech-symbol vue">V</span>
              <div>
                <h3>Vue 3</h3>
                <p>Componentes reativos com Composition API.</p>
              </div>
              <span>INTERFACE</span>
            </article>
            <article>
              <span class="tech-symbol vite">ϟ</span>
              <div>
                <h3>Vite</h3>
                <p>Desenvolvimento ágil e produção otimizada.</p>
              </div>
              <span>BUILD</span>
            </article>
            <article>
              <span class="tech-symbol css">#</span>
              <div>
                <h3>CSS</h3>
                <p>Layout responsivo e uma identidade própria.</p>
              </div>
              <span>ESTILO</span>
            </article>
            <article>
              <span class="tech-symbol js">JS</span>
              <div>
                <h3>JavaScript</h3>
                <p>Interações leves e conteúdo dinâmico.</p>
              </div>
              <span>LÓGICA</span>
            </article>
          </div>
        </section>
      </div>
      <aside class="sidebar">
        <section
          class="panel navigation-card"
          aria-label="Navegação do portfólio"
        >
          <a
            class="brand"
            href="#"
            aria-label="Bruno Alaor, início"
            @click="selectTab('portfolio')"
          >
            <span class="brand-mark">b<span>.</span></span>
            <span
              >BRUNO<span class="brand-light">ALAOR</span
              ><small>PORTFÓLIO PESSOAL</small></span
            >
          </a>
          <nav class="sidebar-nav" aria-label="Navegação principal">
            <button
              :class="{ selected: activeTab === 'portfolio' }"
              :aria-pressed="activeTab === 'portfolio'"
              @click="selectTab('portfolio')"
            >
              <Circle :size="15" /><span>Perfil</span><ArrowRight :size="13" />
            </button>
            <a href="#projects" @click.prevent="showProjects"
              ><Folder :size="15" /><span>Projetos</span><ArrowRight :size="13"
            /></a>
            <button
              :class="{ selected: activeTab === 'about' }"
              :aria-pressed="activeTab === 'about'"
              @click="selectTab('about')"
            >
              <Compass :size="15" /><span>Sobre</span><ArrowRight :size="13" />
            </button>
            <button
              :class="{ selected: activeTab === 'stack' }"
              :aria-pressed="activeTab === 'stack'"
              @click="selectTab('stack')"
            >
              <Code2 :size="15" /><span>Tecnologias</span
              ><ArrowRight :size="13" />
            </button>
            <button @click="contact">
              <Mail :size="15" /><span>Contato</span><ArrowUpRight :size="13" />
            </button>
          </nav>
          <span class="navigation-status"
            ><span class="status-dot" /> Construindo novas ideias</span
          >
        </section>
        <section class="panel player-card">
          <div class="sidebar-heading">
            <h2>Por trás do código</h2>
            <Compass :size="16" />
          </div>
          <p>
            Curiosidade para explorar.<br />Criatividade para conectar.<br />Código
            para construir.
          </p>
          <div class="sidebar-divider" />
          <div class="currently-label">
            <span class="status-dot" /> NESTE MOMENTO
          </div>
          <div class="currently">
            <span class="currently-icon"><Terminal :size="21" /></span>
            <div>
              <strong>Criando meu próximo capítulo</strong
              ><span>Um projeto de cada vez.</span>
            </div>
          </div>
          <button class="text-button" @click="selectTab('about')">
            Mais sobre mim <ArrowRight :size="15" />
          </button>
        </section>
        <section class="panel stack-card">
          <div class="sidebar-heading">
            <h2>Meu inventário</h2>
            <Code2 :size="16" />
          </div>
          <p class="sidebar-subtitle">A stack deste portfólio.</p>
          <div class="tech-grid">
            <div><span class="tech-symbol vue">V</span><span>Vue 3</span></div>
            <div><span class="tech-symbol vite">ϟ</span><span>Vite</span></div>
            <div>
              <span class="tech-symbol js">JS</span><span>JavaScript</span>
            </div>
            <div><span class="tech-symbol css">#</span><span>CSS</span></div>
          </div>
          <button class="text-button" @click="selectTab('stack')">
            Explorar tecnologias <ArrowRight :size="15" />
          </button>
        </section>
        <section class="connect-card">
          <span class="connect-icon"><Mail :size="21" /></span>
          <h2>Vamos criar algo<br />interessante?</h2>
          <p>Boas conversas são o começo<br />de grandes projetos.</p>
          <button class="button button-outline" @click="contact">
            Entrar em contato <ArrowUpRight :size="16" />
          </button>
        </section>
        <div class="sidebar-footnote">
          <span class="status-dot" /> FEITO COM CURIOSIDADE E VUE.
        </div>
      </aside>
    </div>
    <footer class="site-footer">
      <a class="footer-brand" href="#" @click="selectTab('portfolio')"
        >b<span>.</span></a
      >
      <p>
        © {{ new Date().getFullYear() }} {{ profile.name }} <span>·</span> Em
        constante evolução.
      </p>
      <span>CRIADO COM CÓDIGO <Heart :size="12" /> E CAFÉ</span
      ><a href="#" aria-label="Voltar ao topo">Voltar ao topo ↑</a>
    </footer>
  </main>

  <dialog
    ref="projectDialog"
    class="portfolio-dialog"
    aria-labelledby="project-dialog-title"
    @click="(event) => event.target === projectDialog && projectDialog.close()"
  >
    <template v-if="selectedProject"
      ><div class="dialog-top">
        <span class="project-kicker">{{
          selectedProject.demo ? "PROJETO DEMONSTRATIVO" : selectedProject.type
        }}</span
        ><button
          class="icon-button"
          aria-label="Fechar projeto"
          @click="projectDialog.close()"
        >
          <X :size="21" />
        </button>
      </div>
      <span class="dialog-project-icon" :class="selectedProject.color"
        ><Command v-if="selectedProject.id === 'orbit'" :size="35" /><Gamepad2
          v-else-if="selectedProject.id === 'nexus'"
          :size="35" /><Sparkles v-else :size="35"
      /></span>
      <h2 id="project-dialog-title">{{ selectedProject.name }}</h2>
      <p class="dialog-subtitle">{{ selectedProject.subtitle }}</p>
      <p>{{ selectedProject.description }}</p>
      <div class="project-stack">
        <span v-for="tech in selectedProject.stack" :key="tech">{{
          tech
        }}</span>
      </div>
      <div class="dialog-links">
        <a
          v-if="safeLink(selectedProject.liveUrl)"
          class="button button-primary"
          :href="safeLink(selectedProject.liveUrl)"
          target="_blank"
          rel="noopener noreferrer"
          >Ver projeto <ArrowUpRight :size="16" /></a
        ><a
          v-if="safeLink(selectedProject.sourceUrl)"
          class="button button-outline"
          :href="safeLink(selectedProject.sourceUrl)"
          target="_blank"
          rel="noopener noreferrer"
          ><Github :size="16" /> Código-fonte</a
        >
      </div>
      <div
        v-if="
          !safeLink(selectedProject.liveUrl) &&
          !safeLink(selectedProject.sourceUrl)
        "
        class="dialog-notice"
      >
        <Code2 :size="19" /><span
          >Os links de demonstração e código serão adicionados junto com os seus
          projetos reais.</span
        >
      </div>
      <button class="button button-outline" @click="projectDialog.close()">
        Voltar aos projetos <ArrowRight :size="16" /></button
    ></template>
  </dialog>
  <dialog
    ref="contactDialog"
    class="portfolio-dialog contact-dialog"
    aria-labelledby="contact-title"
    @click="(event) => event.target === contactDialog && contactDialog.close()"
  >
    <div class="dialog-top">
      <span class="project-kicker">VAMOS CONVERSAR</span
      ><button
        class="icon-button"
        aria-label="Fechar contato"
        @click="contactDialog.close()"
      >
        <X :size="21" />
      </button>
    </div>
    <span class="dialog-project-icon mint"><Mail :size="33" /></span>
    <h2 id="contact-title">
      Toda ideia começa<br />com um olá<span class="name-dot">.</span>
    </h2>
    <template v-if="hasContacts"
      ><p>Tem uma ideia ou um projeto em mente? Vamos conversar.</p>
      <div class="contact-links">
        <a v-if="emailLink" :href="emailLink" class="button button-primary"
          ><Mail :size="17" /> {{ profile.email }}
          <ArrowUpRight :size="16" /></a
        ><a
          v-if="safeLink(profile.github)"
          :href="safeLink(profile.github)"
          class="button button-outline"
          target="_blank"
          rel="noopener noreferrer"
          ><Github :size="17" /> GitHub <ArrowUpRight :size="16" /></a
        ><a
          v-if="safeLink(profile.linkedin)"
          :href="safeLink(profile.linkedin)"
          class="button button-outline"
          target="_blank"
          rel="noopener noreferrer"
          ><Linkedin :size="17" /> LinkedIn <ArrowUpRight :size="16"
        /></a></div></template
    ><template v-else
      ><p>Esta primeira versão ainda não tem canais de contato configurados.</p>
      <div class="dialog-notice">
        <Mail :size="20" /><span
          >Adicione seu e-mail, GitHub e LinkedIn para que as pessoas possam
          encontrar você por aqui.</span
        >
      </div></template
    ><button class="button button-outline" @click="contactDialog.close()">
      Continuar explorando <ArrowRight :size="16" />
    </button>
  </dialog>
</template>
