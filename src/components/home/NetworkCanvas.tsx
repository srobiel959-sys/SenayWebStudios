"use client";

import { useEffect, useRef } from "react";

// Levende nettverk av blå punkter bak forsidens hero (samme uttrykk som Receptria).
// Punktene trekkes svakt mot musepekeren. Står stille ved redusert bevegelse,
// og pauser når heroen ikke er synlig.

type Point = { x: number; y: number; vx: number; vy: number; r: number };

const LINK = 150;

export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let points: Point[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 14000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.4 + Math.random() * 1.2,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(59,130,246,${0.16 * (1 - d / LINK)})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(points[i].x, points[i].y);
            ctx!.lineTo(points[j].x, points[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.fillStyle = "rgba(96,165,250,0.65)";
      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function tick() {
      for (const p of points) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) {
          p.vx += (dx / d) * 0.025;
          p.vy += (dy / d) * 0.025;
        }
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 1.1) {
          p.vx = (p.vx / speed) * 1.1;
          p.vy = (p.vy / speed) * 1.1;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      draw();
      if (visible) frame = requestAnimationFrame(tick);
    }

    function onMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    resize();
    if (reduced) {
      draw();
    } else {
      tick();
      window.addEventListener("mousemove", onMove);
    }

    const observer = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) frame = requestAnimationFrame(tick);
    });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
