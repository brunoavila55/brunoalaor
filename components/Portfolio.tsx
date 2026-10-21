"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import Magnet from "./react-bits/Magnet";
import DecryptedText from "./react-bits/DecryptedText";
import OrbitPortrait from "./OrbitPortrait";
import Skills from "./Skills";
import { projects, type Project } from "./projects";

const social = {
  github: "https://github.com/brunoavila55",
  linkedin: "https://www.linkedin.com/in/brunoalaor/",
  email: "contato@brunoalaor.com.br",
};
const external = { target: "_blank", rel: "noopener noreferrer" };

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0v100M0 50h100M14.64 14.64l70.72 70.72M14.64 85.36l70.72-70.72"
        stroke="currentColor"
        strokeWidth="14"
      />
    </svg>
  );
}

function ProjectArt() {
  return (
    <div className="mimic-art">
      <div className="mimic-grid" aria-hidden="true" />
      <span className="art-corner">Open source. Built for the network.</span>
      <Image
        className="mimic-logo"
        src="/projects/mimic.webp"
        alt="Identidade do Mimic, um roteador com olho e dentes"
        width={500}
        height={500}
        sizes="(max-width: 700px) 70vw, 340px"
      />
      <div className="mimic-terminal" aria-hidden="true">
        <span className="terminal-dot" />
        <span>backup completed</span>
        <span className="terminal-check">✓</span>
      </div>
      <div className="mimic-packet packet-one" aria-hidden="true" />
      <div className="mimic-packet packet-two" aria-hidden="true" />
    </div>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastProjectTrigger = useRef<HTMLButtonElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smooth = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        anchors: { offset: -100 },
      });
      lenis.current = smooth;
      smooth.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => smooth.raf(time * 1000);
      gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(
            ".hero-line > span",
            { yPercent: 115, rotate: 2, duration: 1.15, stagger: 0.12 },
            0.1,
          )
          .from(
            ".hero-intro, .hero-description, .hero-actions, .hero-social",
            { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
            0.45,
          )
          .from(
            ".portrait-scene",
            { opacity: 0, scale: 0.9, rotate: 5, duration: 1.3 },
            0.2,
          );
        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });
        gsap.to(".orbit-one", {
          rotation: 35,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-star", {
          rotation: 150,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".about-watermark", {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.from(".contact-star", {
          rotate: -90,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }, root);
      return () => {
        context.revert();
        gsap.ticker.remove(tick);
        smooth.destroy();
        lenis.current = null;
      };
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (project && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (project || menuOpen) {
      lenis.current?.stop();
      document.body.classList.add("overlay-open");
    } else {
      lenis.current?.start();
      document.body.classList.remove("overlay-open");
    }
    return () => document.body.classList.remove("overlay-open");
  }, [project, menuOpen]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("keydown", escape);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const closeProject = () => {
    dialog.current?.close();
    setProject(null);
    lastProjectTrigger.current?.focus({ preventScroll: true });
  };
  const openProject = (
    item: Project,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    lastProjectTrigger.current = event.currentTarget;
    setProject(item);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div ref={root}>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="nav-shell page-width">
          <a
            href="#inicio"
            className="wordmark"
            aria-label="Bruno Alaor, início"
          >
            brunoalaor
            <span className="brand-dot" />{" "}
            <span className="wordmark-note">portfólio</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#projetos">
              Projetos<span>{String(projects.length).padStart(2, "0")}</span>
            </a>
            <a href="#sobre">Sobre mim</a>
            <a href="#contato">
              Vamos conversar <ArrowUpRight size={16} />
            </a>
          </nav>
          <div className="header-social">
            <a
              href={social.linkedin}
              {...external}
              aria-label="LinkedIn de Bruno Alaor"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={social.github}
              {...external}
              aria-label="GitHub de Bruno Alaor"
            >
              <Github size={19} />
            </a>
          </div>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegação móvel"
          >
            <a href="#projetos" onClick={() => setMenuOpen(false)}>
              Projetos <ArrowDownRight />
            </a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>
              Sobre mim <ArrowDownRight />
            </a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>
              Vamos conversar <ArrowUpRight />
            </a>
            <div>
              <a href={social.linkedin} {...external}>
                LinkedIn <Linkedin size={18} />
              </a>
              <a href={social.github} {...external}>
                GitHub <Github size={18} />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="conteudo">
        <section
          className="hero page-width"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <div className="hero-intro">
              <span className="hello-dot" /> Olá, eu sou o Bruno Alaor.
            </div>
            <h1 id="hero-title">
              <span className="hero-line">
                <span>Ideias em</span>
              </span>
              <span className="hero-line">
                <span>
                  código.
                  <Star className="hero-star" />
                </span>
              </span>
              <span className="hero-line">
                <span>Soluções reais.</span>
              </span>
            </h1>
            <p className="hero-description">
              Conecto infraestrutura, desenvolvimento e design para transformar
              problemas em produtos que funcionam.
            </p>
            <div className="hero-actions">
              <Magnet padding={35} magnetStrength={5} maxOffset={10}>
                <a href="#projetos" className="button button-primary">
                  Explore os projetos{" "}
                  <span className="button-icon">
                    <ArrowDown size={19} />
                  </span>
                </a>
              </Magnet>
              <a href="#sobre" className="text-link">
                Um pouco sobre mim <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-social">
              <a href={social.linkedin} {...external}>
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
              </a>
              <a href={social.github} {...external}>
                <Github size={18} /> GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <OrbitPortrait />
          <div className="hero-bottom">
            <span>
              São Gabriel, RS <span className="muted">— Brasil</span>
            </span>
            <span className="hero-bottom-center">
              <span className="tiny-cross">+</span>{" "}
              <DecryptedText
                text="Tecnologia com propósito. Sempre."
                animateOn="hover"
                speed={30}
                maxIterations={7}
              />
            </span>
            <a href="#projetos" aria-label="Role para descobrir os projetos">
              Role para descobrir <ArrowDown size={16} />
            </a>
          </div>
        </section>

        <div className="discipline-strip" aria-label="Áreas de atuação">
          <div className="page-width">
            <span>Infraestrutura</span>
            <Star />
            <span>Desenvolvimento</span>
            <Star />
            <span>Automação</span>
            <Star />
            <span>Experiências digitais</span>
            <Star />
          </div>
        </div>

        <section
          className="work-section page-width"
          id="projetos"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                <span className="small-square" /> Projeto em destaque
              </span>
              <h2 id="work-title">
                Menos discurso.
                <br />
                Mais construção.
              </h2>
            </div>
            <p>
              Da rotina de infraestrutura a um projeto open source.
              <br className="desktop-break" /> Conheça o problema, a solução e o
              código.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((item) => (
              <article
                key={item.id}
                className={`project-card project-${item.id}`}
              >
                <button
                  className={`project-visual visual-${item.id}`}
                  aria-label={`Conhecer o projeto ${item.name}`}
                  onClick={(event) => openProject(item, event)}
                >
                  <ProjectArt />
                  <span className="project-hover-label">
                    Conhecer o projeto <ArrowUpRight size={18} />
                  </span>
                  <span className="project-open" aria-hidden="true">
                    <ArrowUpRight size={24} />
                  </span>
                </button>
                <div className="project-info">
                  <div>
                    <span className="project-category">{item.category}</span>
                    <h3>
                      <button onClick={(event) => openProject(item, event)}>
                        {item.name} <ArrowUpRight size={24} />
                      </button>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="project-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    {...external}
                    className="text-link project-source"
                  >
                    <Github size={18} /> Código aberto no GitHub{" "}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <a className="github-more" href={social.github} {...external}>
            <Github size={21} />
            <span>
              Mais ideias, experimentos e código aberto.
              <strong>
                Encontre no meu GitHub <ArrowUpRight size={16} />
              </strong>
            </span>
            <ArrowUpRight className="github-more-arrow" size={26} />
          </a>
        </section>

        <section className="about" id="sobre" aria-labelledby="about-title">
          <span className="about-watermark" aria-hidden="true">
            Curiosidade.
          </span>
          <div className="about-inner page-width">
            <div className="about-title">
              <span className="section-kicker">
                <span className="small-square" /> Além do código
              </span>
              <h2 id="about-title">
                Curioso por natureza.
                <br />
                Construtor por escolha.
              </h2>
              <div className="about-location">
                <span className="location-mark" /> Do interior do RS para
                qualquer lugar.
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                Gosto de entender como as coisas funcionam. E de descobrir como
                podem funcionar melhor.
              </p>
              <p>
                Sou Bruno Alaor. Atuo com infraestrutura no NOC da New Life
                Fibra, cuidando de servidores, virtualização, redes e
                observabilidade. É ali, perto dos problemas reais da operação,
                que muitas das minhas ideias começam.
              </p>
              <p>
                Levo essa experiência para o desenvolvimento: crio automações,
                integro sistemas e construo produtos digitais. Do terminal à
                interface, me interessa o caminho completo entre uma ideia e
                algo útil.
              </p>
              <a href={social.linkedin} {...external} className="text-link">
                Minha trajetória no LinkedIn <ArrowUpRight size={18} />
              </a>
            </div>
            <Skills />
          </div>
        </section>

        <section
          className="tiiv-note page-width"
          aria-label="Tiiv, conceito de marca"
        >
          <div className="tiiv-note-brand">
            <Image
              src="/projects/tiiv-symbol.svg"
              alt="Símbolo da Tiiv"
              width={52}
              height={52}
            />
            <span>
              Um conceito de marca
              <br />
              <strong>Tiiv Technologies</strong>
            </span>
          </div>
          <p>
            Tiiv é um conceito de marca que traduz minha visão de tecnologia:
            conectar ideias, identidade e software com propósito. Um espaço para
            explorar o que quero construir.
          </p>
          <a
            href="https://www.tiiv.com.br/"
            {...external}
            className="text-link"
          >
            Conheça a Tiiv <ArrowUpRight size={19} />
          </a>
        </section>

        <section
          className="contact"
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className="page-width">
            <div className="contact-top">
              <span className="section-kicker">
                <span className="small-square" /> A próxima ideia pode ser a sua
              </span>
              <span className="contact-note">
                Uma boa conversa é um bom começo.
              </span>
            </div>
            <div className="contact-heading">
              <h2 id="contact-title">
                Vamos construir
                <br />
                algo que importa?
              </h2>
              <Magnet padding={60} magnetStrength={5} maxOffset={14}>
                <a
                  href={`mailto:${social.email}`}
                  className="contact-big-arrow"
                  aria-label="Conversar por e-mail"
                >
                  <ArrowUpRight strokeWidth={1.2} />
                </a>
              </Magnet>
              <Star className="contact-star" />
            </div>
            <div className="contact-bottom">
              <div className="email-block">
                <a href={`mailto:${social.email}`} className="contact-email">
                  {social.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="copy-email"
                  aria-label={
                    copied ? "E-mail copiado" : "Copiar endereço de e-mail"
                  }
                >
                  {copied ? <Check size={19} /> : <Copy size={18} />}
                </button>
                <span role="status" className="copy-status">
                  {copied
                    ? "Copiado!"
                    : copyError
                      ? "Selecione o endereço para copiar."
                      : ""}
                </span>
              </div>
              <div className="contact-social">
                <a href={social.linkedin} {...external}>
                  <Linkedin size={20} />
                  LinkedIn
                  <ArrowUpRight size={17} />
                </a>
                <a href={social.github} {...external}>
                  <Github size={20} />
                  GitHub
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <a href="#inicio" className="wordmark">
          brunoalaor
          <span className="brand-dot" />
        </a>
        <p>© {new Date().getFullYear()} Bruno Alaor. Feito com intenção.</p>
        <a href="#inicio" className="back-top">
          De volta ao topo <ArrowUp size={16} />
        </a>
      </footer>

      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
        data-lenis-prevent
      >
        {project && (
          <div className={`dialog-content dialog-${project.id}`}>
            <button
              className="dialog-close"
              onClick={closeProject}
              aria-label="Fechar detalhes do projeto"
            >
              <X size={23} />
            </button>
            <div className="dialog-art">
              <ProjectArt />
            </div>
            <div className="dialog-body">
              <span className="project-category">{project.category}</span>
              <h2 id="project-dialog-title">{project.name}</h2>
              <p className="dialog-tagline">{project.tagline}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="dialog-story">
                <div>
                  <h3>O contexto</h3>
                  <p>{project.challenge}</p>
                </div>
                <div>
                  <h3>A construção</h3>
                  <p>{project.approach}</p>
                </div>
              </div>
              <h3>O que você encontra</h3>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={project.url}
                {...external}
                className="button button-primary"
              >
                {project.linkLabel}
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
