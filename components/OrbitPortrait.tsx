"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Code2, Network } from "lucide-react";

export default function OrbitPortrait() {
  const scene = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType === "touch" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(scene.current, {
      rotateY: (e.clientX - r.left - r.width / 2) / 35,
      rotateX: -(e.clientY - r.top - r.height / 2) / 45,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  return (
    <div
      className="portrait-stage"
      onPointerMove={move}
      onPointerLeave={() =>
        gsap.to(scene.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          overwrite: "auto",
        })
      }
    >
      <div ref={scene} className="portrait-scene">
        <div className="portrait-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true">
          <span />
        </div>
        <div className="orbit orbit-two" aria-hidden="true">
          <span />
        </div>
        <div className="portrait-halo" aria-hidden="true" />
        <div className="portrait-window">
          <Image
            src="/portrait.webp"
            alt="Bruno Alaor, de braços cruzados"
            width={720}
            height={720}
            priority
            sizes="(max-width: 700px) 85vw, 450px"
          />
        </div>
        <div className="portrait-sticker sticker-code">
          <Code2 size={24} strokeWidth={1.5} />
          <span>Ideias em código.</span>
        </div>
        <div className="portrait-sticker sticker-network">
          <Network size={20} />
          <span>Conexões reais.</span>
        </div>
        <div className="portrait-signature">
          <span>Esse sou eu, Bruno.</span>
          <ArrowUpRight size={20} />
        </div>
        <span className="scene-plus plus-one" aria-hidden="true">
          +
        </span>
        <span className="scene-plus plus-two" aria-hidden="true">
          +
        </span>
      </div>
    </div>
  );
}
