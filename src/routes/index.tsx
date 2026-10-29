import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { profile, sections } from "@/data/portfolio";
import { About, Achievements, Contact, Experience, Footer, Hero, Projects, Skills, Testimonials } from "@/components/portfolio/Sections";
import heroStill from "@/assets/models/hero-still.png.asset.json";

const Scene = lazy(() => import("@/components/portfolio/Scene"));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.field} Portfolio` },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: `${profile.name} — Portfolio` },
      { property: "og:description", content: profile.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [dark, setDark] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [lite, setLite] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState("hero");
  const [menu, setMenu] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    const cores = navigator.hardwareConcurrency ?? 8;
    const noGL = !document.createElement("canvas").getContext("webgl2");
    const isLite = noGL || cores <= 2;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setLite(isLite);
    setMobile(isMobile);
    if (isLite || isMobile || r) setLoaded(true);
    setDark(localStorage.getItem("theme") === "dark");
    if (!r) {
      const l = new Lenis({ lerp: 0.09 });
      lenis.current = l;
      let id = 0;
      const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); };
      id = requestAnimationFrame(raf);
      return () => { cancelAnimationFrame(id); l.destroy(); };
    }
    return undefined;
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const m = (e: PointerEvent) => { if (cursor.current) cursor.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`; };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, []);

  // Safety: never leave the loader up forever.
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 6000); return () => clearTimeout(t); }, []);

  const go = useCallback((id: string) => {
    setMenu(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { offset: id === "hero" ? 0 : -40, duration: 1.4 });
    else el.scrollIntoView();
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {!loaded && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.6 }} className="font-display text-5xl font-bold">
              {profile.initials}<span className="text-accent">.</span>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent" />
      <div ref={cursor} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-5 w-5 rounded-full border border-accent [@media(pointer:fine)]:block" />

      <div className="pointer-events-none fixed inset-0 z-0" data-scene-ready={loaded || undefined} aria-hidden>
        {!(lite || mobile || reduced) ? (
          <Suspense fallback={null}><Scene reduced={reduced} dark={dark} onReady={() => setLoaded(true)} /></Suspense>
        ) : (
          <img src={heroStill.url} alt="" className="absolute -right-[8%] top-[9%] w-[55vw] object-contain opacity-90 md:right-[4%] md:top-1/2 md:w-[min(80vw,34rem)] md:-translate-y-1/2" />
        )}
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="container-x flex items-center justify-between py-5" aria-label="Main">
          <button onClick={() => go("hero")} className="font-display text-xl font-bold">{profile.initials}<span className="text-accent">.</span></button>
          <ul className="hidden items-center gap-1 rounded-full border bg-background/70 p-1 backdrop-blur-md md:flex">
            {sections.slice(1).map((s) => (
              <li key={s.id}>
                <button onClick={() => go(s.id)} aria-current={active === s.id ? "true" : undefined}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${active === s.id ? "bg-primary text-primary-foreground" : "hover:text-accent"}`}>{s.label}</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle dark mode" className="rounded-full border bg-background/70 px-3 py-1.5 text-sm backdrop-blur-md">{dark ? "Light" : "Dark"}</button>
            <button onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Menu" className="rounded-full border bg-background/70 px-3 py-1.5 text-sm backdrop-blur-md md:hidden">{menu ? "Close" : "Menu"}</button>
          </div>
        </nav>
        <AnimatePresence>
          {menu && (
            <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="container-x space-y-1 bg-background pb-6 md:hidden">
              {sections.slice(1).map((s) => (
                <li key={s.id}><button onClick={() => go(s.id)} className={`w-full py-2 text-left font-display text-3xl font-bold ${active === s.id ? "text-accent" : ""}`}>{s.label}</button></li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <Hero go={go} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <div className="relative z-10"><Footer top={() => go("hero")} /></div>
    </div>
  );
}
