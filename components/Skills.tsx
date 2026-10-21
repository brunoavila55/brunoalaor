"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  {
    name: "Linux",
    icon: "linux",
    tools: "Ubuntu e RHEL",
    description:
      "Administro servidores e serviços que mantêm os sistemas de negócio funcionando no dia a dia.",
  },
  {
    name: "Docker",
    icon: "docker",
    tools: "Containers e serviços",
    description:
      "Levo serviços para containers, organizando ambientes e suas dependências para simplificar a operação.",
  },
  {
    name: "Proxmox",
    icon: "proxmox",
    tools: "Virtualização e capacidade",
    description:
      "Cuido de ambientes virtualizados, da organização dos recursos à padronização e expansão dos virtualizadores.",
  },
  {
    name: "Redes",
    icon: "networkx",
    tools: "Conectividade e diagnóstico",
    description:
      "Investigo problemas de conexão e acompanho redes e serviços, com a experiência de quem começou no suporte.",
  },
  {
    name: "Observabilidade",
    icon: "azure-metrics",
    tools: "Zabbix e Grafana",
    description:
      "Transformo telemetria em painéis de rede e indicadores operacionais para acompanhar a saúde dos serviços.",
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    tools: "SQL e dados operacionais",
    description:
      "Escrevo consultas, relaciono dados e preparo informações que ajudam a operação a tomar decisões.",
  },
];

export default function Skills() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanups: (() => void)[] = [];
      const context = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".skills-heading",
              start: "top 90%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          })
          .from(".skill-title-word > span", {
            yPercent: 110,
            rotate: 5,
            duration: 0.8,
            stagger: 0.07,
          })
          .from(
            ".skills-heading > p",
            { opacity: 0, y: 18, duration: 0.7 },
            0.25,
          );

        const items = gsap.utils.toArray<HTMLLIElement>(".skill-item");
        items.forEach((item, index) => {
          const visible = (value: boolean) => {
            item.dataset.inView = String(value);
          };
          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              once: true,
            },
            delay: window.innerWidth > 700 ? (index % 3) * 0.12 : 0,
            defaults: { ease: "power3.out" },
          });
          reveal
            .from(item, { opacity: 0, y: 35, duration: 0.85 })
            .from(
              item.querySelector(".skill-icon"),
              {
                scale: 0.55,
                rotation: -24,
                duration: 0.8,
                ease: "back.out(1.7)",
              },
              0.12,
            )
            .from(
              item.querySelectorAll("h4, .skill-tools, p"),
              { opacity: 0, y: 12, duration: 0.6, stagger: 0.07 },
              0.18,
            );

          ScrollTrigger.create({
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => visible(isActive),
          });

          // Pointer motion is separate from the entrance and runs only on a fine pointer.
          if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            return;
          const tiltX = gsap.quickTo(item, "rotationX", {
            duration: 0.6,
            ease: "power3.out",
          });
          const tiltY = gsap.quickTo(item, "rotationY", {
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.set(item, { transformPerspective: 900 });
          const move = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            const rect = item.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            item.style.setProperty("--pointer-x", `${x * 100}%`);
            item.style.setProperty("--pointer-y", `${y * 100}%`);
            tiltX((0.5 - y) * 7);
            tiltY((x - 0.5) * 7);
          };
          const leave = () => {
            tiltX(0);
            tiltY(0);
          };
          item.addEventListener("pointermove", move);
          item.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            item.removeEventListener("pointermove", move);
            item.removeEventListener("pointerleave", leave);
          });
        });
        gsap.from(".skills-connection > *", {
          opacity: 0,
          y: 22,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-connection",
            start: "top 94%",
            once: true,
          },
        });
      }, section);
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        context.revert();
        section.current
          ?.querySelectorAll<HTMLElement>(".skill-item")
          .forEach((item) => {
            delete item.dataset.inView;
            item.style.removeProperty("--pointer-x");
            item.style.removeProperty("--pointer-y");
          });
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section
      ref={section}
      className="skills-area"
      aria-labelledby="skills-title"
    >
      <div className="skills-heading">
        <h3 id="skills-title" aria-label="O que uso para fazer acontecer.">
          {"O que uso para fazer acontecer.".split(" ").map((word, index) => (
            <span key={index} className="skill-title-word" aria-hidden="true">
              <span>{word}</span>
            </span>
          ))}
        </h3>
        <p>
          Ferramentas que fazem parte do meu trabalho, do servidor ao produto.
        </p>
      </div>
      <ul className="skills-grid">
        {skills.map((skill, index) => (
          <li
            key={skill.name}
            className="skill-item"
            style={{ "--skill-delay": `${index * -0.65}s` } as CSSProperties}
          >
            <div className="skill-identity">
              <span className="skill-icon">
                <Image
                  src={`/skills/${skill.icon}.svg`}
                  alt=""
                  width={28}
                  height={28}
                />
              </span>
              <div>
                <h4>{skill.name}</h4>
                <span className="skill-tools">{skill.tools}</span>
              </div>
            </div>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
      <div className="skills-connection">
        <p>
          <strong>E, para conectar tudo, código.</strong> Uso Go, Python e APIs
          para integrar sistemas e automatizar rotinas. Também exploro IA
          aplicada a fluxos de helpdesk e suporte.
        </p>
        <a href="#projetos" className="text-link skills-project-link">
          Veja isso nos projetos <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
