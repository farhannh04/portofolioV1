"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

async function particlesInit(engine: Engine) {
  await loadSlim(engine);
}

function ParticleCanvas({ id }: { id: string }) {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <Particles
      id={id}
      options={{
        fullScreen: { enable: false, zIndex: 0 },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "bubble"],
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.8,
              },
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
              opacity: 1,
            },
            push: {
              quantity: 3,
            },
          },
        },
        particles: {
          color: {
            value: "#3b82f6",
          },
          links: {
            color: "#3b82f6",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.2, // Dikurangi agar lebih smooth
            straight: false,
          },
          number: {
            density: {
              enable: true,
              height: 800,
              width: 800,
            },
            value: typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 30, // Lebih sedikit di HP
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
      className="w-full h-full"
    />
  );
}

export default function ParticleNetwork({ id = "tsparticles" }: { id?: string }) {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none">
      <ParticlesProvider init={particlesInit}>
        <ParticleCanvas id={id} />
      </ParticlesProvider>
    </div>
  );
}
