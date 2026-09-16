import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palette for cosmic stars
    const starColors = ['#e0f2fe', '#ffffff', '#c084fc', '#67e8f9', '#f472b6', '#cbd5e1'];

    // Initialize stars
    const starCount = Math.min(Math.floor((width * height) / 4500), 220);
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Floating micro-particles
    const particleCount = 35;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.2 - 0.05,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Nebulae Glows
      const grad1 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.25,
        50,
        width * 0.85,
        height * 0.25,
        width * 0.55
      );
      grad1.addColorStop(0, 'rgba(88, 28, 135, 0.18)'); // Deep Purple
      grad1.addColorStop(0.5, 'rgba(14, 116, 144, 0.1)'); // Cyan/Teal
      grad1.addColorStop(1, 'rgba(7, 9, 19, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.75,
        40,
        width * 0.15,
        height * 0.75,
        width * 0.45
      );
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.12)'); // Electric Blue
      grad2.addColorStop(0.6, 'rgba(124, 58, 237, 0.07)'); // Violet
      grad2.addColorStop(1, 'rgba(7, 9, 19, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.twinkleSpeed = -Math.abs(star.twinkleSpeed);
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleSpeed = Math.abs(star.twinkleSpeed);
        }

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle diffraction spike on bright stars
        if (star.size > 1.4 && star.alpha > 0.75) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = (star.alpha - 0.5) * 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2.8, star.y);
          ctx.lineTo(star.x + star.size * 2.8, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2.8);
          ctx.lineTo(star.x, star.y + star.size * 2.8);
          ctx.stroke();
        }
        ctx.restore();
      });

      // 3. Render Floating Dust Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Handle Shooting Stars
      const now = Date.now();
      if (now - lastShootingStarTime > 7000 && Math.random() < 0.015 && shootingStars.length < 2) {
        lastShootingStarTime = now;
        shootingStars.push({
          x: Math.random() * width * 0.7,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 110 + 60,
          speed: Math.random() * 9 + 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          life: 0,
          maxLife: 35,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life++;

        const currentAlpha = Math.max(0, 1 - ss.life / ss.maxLife);

        ctx.save();
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const ssGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        ssGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        ssGrad.addColorStop(0.7, `rgba(192, 132, 252, ${currentAlpha * 0.7})`);
        ssGrad.addColorStop(1, `rgba(255, 255, 255, ${currentAlpha})`);

        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
        ctx.restore();

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Futuristic Deep Space Grid / Coordinate Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:5rem_5rem]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 90%)',
        }}
      />

      {/* Detailed Pluto Planet Element */}
      <div className="absolute -top-16 -right-24 md:-top-20 md:-right-20 lg:-top-16 lg:right-4 w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] select-none pointer-events-none opacity-90 transition-opacity duration-1000">
        {/* Pluto Atmospheric Cyan Halo (The iconic New Horizons blue haze layer) */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-tr from-cyan-500/25 via-sky-600/15 to-purple-600/10 animate-pulse-glow" />

        {/* Planet Sphere Body */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_-30px_-30px_70px_rgba(0,0,0,0.95),inset_20px_20px_40px_rgba(255,255,255,0.15),0_0_60px_rgba(56,189,248,0.2)]"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #ebd7c7 0%, #d8a074 18%, #ad6d48 38%, #573127 65%, #181119 90%, #06050b 100%)',
          }}
        >
          {/* Surface Texture & Rotating Terrain (Tombaugh Regio & Craters) */}
          <div
            className="absolute inset-0 opacity-85 mix-blend-overlay animate-pluto-surface"
            style={{
              backgroundImage: `radial-gradient(circle at 45% 45%, #ffffff 0%, transparent 22%),
                radial-gradient(circle at 65% 55%, #edd2c0 0%, transparent 28%),
                radial-gradient(ellipse at 30% 65%, #2a1b18 0%, transparent 35%),
                radial-gradient(circle at 75% 25%, #3d2420 0%, transparent 20%),
                repeating-linear-gradient(45deg, rgba(82, 45, 36, 0.15) 0px, rgba(82, 45, 36, 0.15) 20px, transparent 20px, transparent 40px)`,
              backgroundSize: '200% 100%',
            }}
          />

          {/* The Pluto Heart (Sputnik Planitia / Tombaugh Regio Glacier) */}
          <div
            className="absolute top-[38%] left-[28%] w-36 h-32 md:w-48 md:h-40 opacity-70 blur-[1.5px] pointer-events-none rotate-[-12deg]"
            style={{
              background:
                'radial-gradient(ellipse at 40% 40%, rgba(255,248,240,0.9) 0%, rgba(240,215,195,0.7) 45%, rgba(190,140,110,0.2) 75%, transparent 100%)',
              clipPath:
                'path("M 50,25 C 50,10 70,0 90,10 C 110,20 120,45 105,75 C 90,100 50,130 50,130 C 50,130 10,100 -5,75 C -20,45 -10,20 10,10 C 30,0 50,10 50,25 Z")',
            }}
          />

          {/* 3D Night-Side Shadow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/60 to-transparent pointer-events-none" />

          {/* Atmospheric Blue Limb/Rim (New Horizons discovery) */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 shadow-[inset_0_0_25px_rgba(56,189,248,0.4)] pointer-events-none" />
        </div>

        {/* Charon — Pluto's Binary Moon */}
        <div
          className="absolute -bottom-8 -left-12 sm:-bottom-12 sm:-left-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden animate-float-gentle shadow-[0_0_30px_rgba(148,163,184,0.15)]"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #94a3b8 0%, #64748b 35%, #334155 65%, #0f172a 90%, #020617 100%)',
          }}
        >
          {/* Charon's dark reddish north polar cap (Mordor Macula) */}
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#693931]/60 to-transparent opacity-80 blur-[2px]" />
          {/* Night Shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 rounded-full border border-slate-500/20" />
        </div>

        {/* Distant Crescent Moons (Hydra & Nix) */}
        <div className="absolute top-1/2 -left-20 w-3.5 h-3.5 rounded-full bg-cyan-200/90 shadow-[0_0_8px_rgba(103,232,249,0.8)] opacity-75" />
        <div className="absolute -bottom-16 right-1/4 w-2.5 h-2.5 rounded-full bg-slate-300/80 shadow-[0_0_6px_rgba(255,255,255,0.7)] opacity-60" />
      </div>

      {/* Distant Planet (Neptune with faint azure glow in Kuiper distance) */}
      <div className="hidden lg:block absolute bottom-24 -left-16 w-44 h-44 rounded-full opacity-35 blur-[0.5px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/60 via-blue-700/40 to-black shadow-[0_0_40px_rgba(56,189,248,0.2)]" />
        {/* Subtle Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 border border-cyan-400/20 rounded-full rotate-[-25deg]" />
      </div>
    </div>
  );
};
