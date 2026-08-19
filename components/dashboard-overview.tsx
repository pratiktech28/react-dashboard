"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, CheckCircle2, CircleDollarSign, Clock3, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type ActivityRow = { id: string; description: string; type: string; createdAt: Date };
type Props = { name: string; completion: number; activityCount: number; memberSince: string; activities: ActivityRow[] };

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const start = performance.now(); const animation = (now: number) => { const progress = Math.min((now - start) / 850, 1); setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(animation); }; requestAnimationFrame(animation); }, [value]);
  return <>{current}{suffix}</>;
}

const cardMotion = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export function DashboardOverview({ name, completion, activityCount, memberSince, activities }: Props) {
  const stats = [
    { label: "Profile strength", value: <Counter value={completion} suffix="%" />, detail: "Keep building your presence", trend: "+12.5% this week", icon: Sparkles, color: "from-violet-500 to-indigo-600" },
    { label: "Workspace activity", value: <Counter value={activityCount} />, detail: "Actions in latest history", trend: "+8.2% this week", icon: Activity, color: "from-sky-500 to-cyan-500" },
    { label: "Account health", value: "Excellent", detail: "All security checks passed", trend: "100% protected", icon: CheckCircle2, color: "from-emerald-400 to-teal-500" },
    { label: "Member since", value: memberSince, detail: "Building momentum together", trend: "Early adopter", icon: Clock3, color: "from-orange-400 to-rose-500" },
  ];
  return <div className="space-y-6 md:space-y-8">
    <motion.section {...cardMotion} animate="animate" className="relative overflow-hidden rounded-[28px] border border-indigo-200/60 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-8 text-white shadow-[0_24px_70px_-26px_rgba(79,70,229,.75)] md:px-9 md:py-10">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" /><div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="relative max-w-2xl"><div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15"><Sparkles size={14}/></span> Your workspace, elevated</div><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Good to see you, {name}.</h1><p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100 md:text-base">You’re making meaningful progress. One small update today keeps your workspace in peak form.</p><a href="/profile" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-950/15 transition hover:-translate-y-0.5">Complete your profile <ArrowUpRight size={16}/></a></div>
    </motion.section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, index) => { const Icon = stat.icon; return <motion.article key={stat.label} {...cardMotion} animate="animate" transition={{ delay: .08 + index * .07 }} whileHover={{ y: -5 }} className="group glass-card relative overflow-hidden p-5"><div className={`absolute right-0 top-0 h-24 w-24 -translate-y-10 translate-x-10 rounded-full bg-gradient-to-br ${stat.color} opacity-[.12] blur-xl transition group-hover:opacity-25`} /><div className="relative flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{stat.label}</p><p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{stat.value}</p></div><span title={stat.detail} className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}><Icon size={18}/></span></div><div className="relative mt-5 flex items-center gap-1.5 text-xs font-medium text-emerald-600"><ArrowUpRight size={14}/>{stat.trend}</div></motion.article>; })}</section>
    <div className="grid gap-6 xl:grid-cols-[1.45fr_.9fr]">
      <motion.section {...cardMotion} animate="animate" transition={{ delay: .35 }} className="glass-card p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Recent activity</p><p className="mt-1 text-sm text-slate-500">A live view of your workspace.</p></div><a href="/activity" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">View all</a></div><div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">{activities.length ? activities.map((item) => <div key={item.id} className="flex items-center gap-3 py-4 first:pt-1"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950"><Activity size={16}/></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.description}</p><p className="mt-0.5 text-xs text-slate-500">{item.type}</p></div><time className="whitespace-nowrap text-xs text-slate-400">{new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(item.createdAt))}</time></div>) : <div className="py-12 text-center"><CircleDollarSign className="mx-auto text-indigo-300"/><p className="mt-3 text-sm text-slate-500">Your latest updates will land here.</p></div>}</div></motion.section>
      <motion.aside {...cardMotion} animate="animate" transition={{ delay: .42 }} className="glass-card p-6"><p className="text-sm font-semibold">Profile momentum</p><p className="mt-1 text-sm text-slate-500">A little polish goes a long way.</p><div className="mt-7 grid place-items-center"><div className="grid h-36 w-36 place-items-center rounded-full" style={{ background: `conic-gradient(#6366f1 ${completion * 3.6}deg, #e2e8f0 0deg)` }}><div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center dark:bg-slate-900"><strong className="text-3xl tracking-tight">{completion}%</strong><span className="text-[11px] text-slate-500">complete</span></div></div></div><a href="/profile" className="btn-secondary mt-7 w-full">Review profile</a></motion.aside>
    </div>
  </div>;
}
