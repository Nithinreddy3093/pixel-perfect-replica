import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { awards, certifications, counters, profile, projects, research, skills, timeline, type Project, type ProjectCategory } from "@/data/portfolio";

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionHead({ n, eyebrow, title }: { n: string; eyebrow: string; title: ReactNode }) {
  return (
    <motion.div {...reveal} className="mb-14 md:mb-20">
      <p className="eyebrow"><span className="text-accent">{n}</span> — {eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold md:text-6xl">{title}</h2>
    </motion.div>
  );
}

export function Hero({ go }: { go: (id: string) => void }) {
  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <div className="container-x">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="eyebrow">
          Portfolio — {new Date().getFullYear()}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-[18vw] font-bold leading-[0.88] md:text-[9.5rem]"
        >
          {profile.name.split(" ")[0]}<br />{profile.name.split(" ").slice(1).join(" ")}<span className="text-accent">.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 max-w-md text-lg text-muted-foreground">
          {profile.tagline}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex flex-wrap gap-3">
          <button onClick={() => go("projects")} className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">View Work</button>
          <a href={profile.cvUrl} download className="rounded-full border border-foreground/20 px-7 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent">Download CV</a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden>
        <span className="eyebrow">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="h-8 w-px bg-foreground/40" />
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="py-32">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6 md:col-start-7">
          <SectionHead n="01" eyebrow="About" title="A little about me." />
          <motion.p {...reveal} className="text-xl leading-relaxed">{profile.about}</motion.p>
          <motion.dl {...reveal} className="mt-12 grid gap-6 sm:grid-cols-3">
            {profile.facts.map((f) => (
              <div key={f.label} className="border-t pt-4">
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2 font-display font-medium">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.div {...reveal} className="md:col-span-4 md:col-start-1 md:row-start-1 md:mt-40">
          <div role="img" aria-label={`Portrait placeholder for ${profile.name}`} className="flex aspect-[4/5] items-end rounded-2xl bg-secondary p-5">
            <span className="eyebrow">Portrait — replace me</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="container-x">
        <SectionHead n="02" eyebrow="Skills" title="Tools I think with." />
        <div className="grid gap-5 md:grid-cols-2 lg:w-3/4">
          {skills.map((g, i) => (
            <motion.div key={g.group} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="rounded-2xl border bg-card/80 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <h3 className="text-lg font-semibold">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => <li key={s} className="rounded-full bg-secondary px-3.5 py-1.5 text-sm">{s}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i, open }: { p: Project; i: number; open: () => void }) {
  return (
    <motion.article {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.08 }} className="group">
      <button onClick={open} className="block w-full text-left" aria-label={`Open ${p.title} details`}>
        <div className="overflow-hidden rounded-2xl transition-transform duration-500 group-hover:[transform:perspective(900px)_rotateX(2deg)_rotateY(-3deg)]">
          <div className="flex aspect-[4/3] items-end p-5 transition-transform duration-700 group-hover:scale-105"
            style={{ background: `oklch(0.86 0.06 ${p.hue})` }}>
            <span className="font-display text-6xl font-bold opacity-20" style={{ color: `oklch(0.3 0.05 ${p.hue})` }}>0{i + 1}</span>
          </div>
        </div>
        <h3 className="mt-5 text-2xl font-semibold">{p.title}</h3>
        <p className="mt-1 text-muted-foreground">{p.blurb}</p>
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.tags.map((t) => <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>)}
        <span className="ml-auto flex gap-4 text-sm font-medium">
          <a href={p.live} className="hover:text-accent">Live ↗</a>
          <a href={p.code} className="hover:text-accent">Code ↗</a>
        </span>
      </div>
    </motion.article>
  );
}

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Security", "Full-Stack", "AI"];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <section id="projects" className="py-32">
      <div className="container-x">
        <SectionHead n="03" eyebrow="Selected work" title={<>Things I've <span className="text-accent">built.</span></>} />
        <motion.div {...reveal} className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "hover:border-accent hover:text-accent"}`}>
              {f}
            </button>
          ))}
        </motion.div>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => <ProjectCard key={p.title} p={p} i={i} open={() => setActive(p)} />)}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm md:p-10" onClick={() => setActive(null)}>
            <motion.div role="dialog" aria-modal aria-label={active.title}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} className="mx-auto max-w-3xl rounded-3xl bg-card p-8 md:p-12">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-4xl font-bold">{active.title}</h3>
                <button autoFocus onClick={() => setActive(null)} className="rounded-full border px-4 py-2 text-sm hover:border-accent">Close</button>
              </div>
              <p className="mt-3 text-muted-foreground">{active.blurb}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {(["problem", "role", "process", "result"] as const).map((k) => (
                  <div key={k} className="border-t pt-4"><p className="eyebrow">{k}</p><p className="mt-2">{active[k]}</p></div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[0, 1].map((n) => (
                  <div key={n} role="img" aria-label="Screenshot placeholder" className="aspect-video rounded-xl" style={{ background: `oklch(${0.86 - n * 0.06} 0.06 ${active.hue})` }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Research() {
  return (
    <section id="research" className="py-32">
      <div className="container-x">
        <SectionHead n="04" eyebrow="Research" title="Published work." />
        <motion.div {...reveal} className="rounded-3xl border bg-card/80 p-8 backdrop-blur-sm md:p-12 lg:w-3/4">
          <p className="eyebrow"><span className="text-accent">{research.venue}</span> · {research.docNo}</p>
          <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">{research.title}</h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{research.text}</p>
          <a href={research.link} target="_blank" rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
            Read Paper ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({ t }: { t: (typeof timeline)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  return (
    <motion.li ref={ref} {...reveal} className="relative pb-14 pl-10">
      <span className={`absolute left-[-7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-500 ${inView ? "border-accent bg-accent" : "border-foreground/30 bg-background"}`} />
      <p className={`eyebrow transition-colors ${inView ? "text-accent" : ""}`}>{t.when} · {t.kind}</p>
      <h3 className="mt-2 text-2xl font-semibold">{t.title}</h3>
      <p className="mt-2 max-w-lg text-muted-foreground">{t.text}</p>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="container-x">
        <SectionHead n="05" eyebrow="Experience & education" title="The journey so far." />
        <ol className="ml-2 border-l border-foreground/15 md:w-2/3">
          {timeline.map((t) => <TimelineItem key={t.title} t={t} />)}
        </ol>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)); } });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>0</span>;
}

export function Achievements() {
  return (
    <section id="achievements" className="py-32">
      <div className="container-x">
        <SectionHead n="06" eyebrow="Achievements" title="By the numbers." />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {counters.map((c) => (
            <motion.div key={c.label} {...reveal} className="border-t pt-6">
              <p className="font-display text-6xl font-bold md:text-7xl"><Counter value={c.value} /><span className="text-accent">{c.suffix}</span></p>
              <p className="mt-2 text-muted-foreground">{c.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {awards.map((a, i) => (
            <motion.div key={a.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="flex items-center justify-between rounded-2xl border bg-card/80 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lift">
              <div><h3 className="text-lg font-semibold">{a.title}</h3><p className="text-sm text-muted-foreground">{a.org}</p></div>
              {a.year && <span className="font-display text-sm text-accent">{a.year}</span>}
            </motion.div>
          ))}
        </div>
        <motion.div {...reveal} className="mt-20">
          <p className="eyebrow">Certifications</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {certifications.map((c) => <li key={c} className="rounded-full border px-4 py-2 text-sm">{c}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n: { name?: string; email?: string; message?: string } = {};
    if (!v.name.trim()) n.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) n.email = "Please enter a valid email.";
    if (v.message.trim().length < 10) n.message = "A few more words, please (10+ characters).";
    setErr(n);
    if (!Object.keys(n).length) setSent(true);
  };
  const field = "w-full border-b border-foreground/25 bg-transparent py-3 text-lg outline-none transition-colors focus:border-accent";
  return (
    <section id="contact" className="py-32">
      <div className="container-x grid gap-16 md:grid-cols-2">
        <div>
          <p className="eyebrow"><span className="text-accent">07</span> — Contact</p>
          <motion.h2 {...reveal} className="mt-4 text-6xl font-bold leading-[0.95] md:text-8xl">Let's build something secure<span className="text-accent">.</span></motion.h2>
          <a href={`mailto:${profile.email}`} className="mt-10 inline-block text-xl underline decoration-accent underline-offset-8 hover:text-accent">{profile.email}</a>
          <ul className="mt-8 flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">{s.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card/85 p-8 backdrop-blur-sm md:p-10">
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col justify-center py-12" role="status">
              <span className="text-4xl text-accent">✓</span>
              <h3 className="mt-4 text-3xl font-bold">Thanks, {v.name.split(" ")[0]}!</h3>
              <p className="mt-2 text-muted-foreground">Your message is on its way. I'll reply within a couple of days.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-8">
              {(["name", "email", "message"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={k} className="eyebrow">{k}</label>
                  {k === "message" ? (
                    <textarea id={k} rows={4} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={field} aria-invalid={!!err[k]} />
                  ) : (
                    <input id={k} type={k === "email" ? "email" : "text"} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={field} aria-invalid={!!err[k]} />
                  )}
                  {err[k] && <p className="mt-2 text-sm text-destructive">{err[k]}</p>}
                </div>
              ))}
              <button type="submit" className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">Send message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer({ top }: { top: () => void }) {
  return (
    <footer className="border-t py-10">
      <div className="container-x flex items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <button onClick={top} className="rounded-full border px-4 py-2 transition-colors hover:border-accent hover:text-accent">Back to top ↑</button>
      </div>
    </footer>
  );
}
