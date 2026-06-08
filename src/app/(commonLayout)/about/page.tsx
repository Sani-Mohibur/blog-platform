import React from "react";
import {
  FileText,
  Users,
  Activity,
  Layers,
  Database,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const email = "mohiburrahmansani@gmail.com";
  const developerName = "Mohibur Rahman Sani";

  const features = [
    {
      title: "Open Community",
      description:
        "A public platform where anyone can register, share unique insights, and engage with modern tech or lifestyle stories.",
      icon: Users,
      color: "from-blue-500/5 dark:from-blue-500/10",
    },
    {
      title: "Dynamic Dashboard",
      description:
        "Equipped with specialized roles. Authors manage their post history while administrators monitor critical node logs.",
      icon: FileText,
      color: "from-purple-500/5 dark:from-purple-500/10",
    },
    {
      title: "Live Telemetry",
      description:
        "Real-time system sync that updates views, user counts, and interaction infrastructure across the cluster metrics.",
      icon: Activity,
      color: "from-emerald-500/5 dark:from-emerald-500/10",
    },
  ];

  const techStack = [
    {
      name: "Next.js 16",
      layer: "Frontend Framework",
      icon: Layers,
      hoverColor:
        "group-hover:text-black dark:group-hover:text-white group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800",
    },
    {
      name: "Express.js",
      layer: "Backend Runtime",
      icon: Terminal,
      hoverColor:
        "group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/5",
    },
    {
      name: "PostgreSQL",
      layer: "Database Storage",
      icon: Database,
      hoverColor:
        "group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:bg-blue-500/5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f7fa] via-[#f1ecf7] to-[#e8def5] dark:from-zinc-950 dark:via-zinc-900 dark:to-purple-950/40 text-zinc-900 dark:text-zinc-100 selection:bg-purple-100 dark:selection:bg-purple-900/50 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24 space-y-20">
        {/* HERO SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-zinc-200/60 dark:border-zinc-800/80 pb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50">
            A Clean Space for Shared Intellect
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            ThoughtSpace is a modern full-stack writing ecosystem engineered for
            speed, structural transparency, and elegant presentation. Built from
            the ground up to allow independent creators a smooth publishing
            pathway.
          </p>
        </div>

        {/* ECOSYSTEM FEATURES */}
        <div className="space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 text-center sm:text-left">
            Platform Matrix
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/80 p-6 transition-all duration-300 hover:border-purple-300/50 dark:hover:border-purple-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_12px_40px_rgba(120,119,198,0.06)] dark:hover:shadow-[0_12px_40px_rgba(168,85,247,0.04)]"
                >
                  <div
                    className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${item.color} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative flex items-center justify-between text-zinc-400 dark:text-zinc-500 mb-4">
                    <Icon className="h-5 w-5 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="relative text-lg font-medium text-zinc-800 dark:text-zinc-200 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CORE ARCHITECTURE STACK */}
        <div className="space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            System Infrastructure
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group flex items-center gap-4 rounded-xl bg-white/50 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800/60 p-5 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:border-purple-300/30 dark:hover:border-purple-500/20 transition-all duration-300 shadow-sm"
                >
                  {/* Reactive Icon Wrapper Wrapper Box */}
                  <div
                    className={`p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 transition-all duration-300 ${tech.hoverColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {tech.name}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {tech.layer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DEVELOPER PROFILE */}
        <div className="rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-white/90 dark:border-zinc-800/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              The Architect
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {developerName}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Full-Stack & Backend Engineer specializing in scalable application
              logic, automated system boilerplates, and clean relational
              database architectures. This platform acts as an active validation
              of real-time decoupled engineering.
            </p>
          </div>

          {/* CONTACT LINKS */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-between gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 px-4 py-3 text-xs font-medium text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors group shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> Contact Node
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors" />
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/Sani-Mohibur"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 px-3 py-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors shadow-sm"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sani-mohibur"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 px-3 py-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors shadow-sm"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
