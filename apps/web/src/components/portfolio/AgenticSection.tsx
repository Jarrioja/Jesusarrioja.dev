import { useEffect, useMemo, useRef } from "react";
import agentic from "@/data/agentic.json";
import activityData from "@/data/activity.json";
import { activityStats, levelScale, type Activity } from "@/lib/activity";
import { cn } from "@/lib/utils";

type Locale = "en" | "es";

const LEVEL_CLASSES = [
  "bg-neutral-200/70 dark:bg-neutral-800",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-700 dark:bg-emerald-300",
];

const t = {
  en: {
    contributions: "contributions in the last year",
    streak: "day streak",
    activeDays: "active days of",
    bestDay: "best day",
    updated: "GitHub · updated",
    less: "Less",
    more: "More",
    private: "Includes private repositories. Counts only.",
  },
  es: {
    contributions: "contribuciones en el último año",
    streak: "días seguidos",
    activeDays: "días activos de",
    bestDay: "mejor día",
    updated: "GitHub · actualizado al",
    less: "Menos",
    more: "Más",
    private: "Incluye repositorios privados. Solo conteos.",
  },
};

// Static snapshot; refresh it with `pnpm activity` until the live API is wired.
const activity: Activity = activityData;

function formatDay(date: string, locale: Locale) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, { day: "numeric", month: "short" });
}

function Heatmap({ activity, locale }: { activity: Activity; locale: Locale }) {
  const level = useMemo(() => levelScale(activity), [activity]);
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the grid scrolls; start at the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [activity]);

  const columns = { gridTemplateColumns: `repeat(${activity.weeks.length}, minmax(0, 1fr))` };
  const monthOf = (date: string) => new Date(`${date}T12:00:00`).getMonth();

  return (
    <div ref={scroller} className="overflow-x-auto pb-1">
      <div className="min-w-[640px]">
        <div className="grid gap-[3px] text-[10px] text-muted-foreground mb-1" style={columns}>
          {activity.weeks.map((week, i) => {
            // Label the first week of each month, skipping a partial month at the right edge.
            const isNewMonth = i === 0 || monthOf(week[0].date) !== monthOf(activity.weeks[i - 1][0].date);
            return (
              <span key={week[0].date} className="whitespace-nowrap overflow-visible">
                {isNewMonth && i < activity.weeks.length - 2
                  ? new Date(`${week[0].date}T12:00:00`).toLocaleDateString(locale, { month: "short" })
                  : ""}
              </span>
            );
          })}
        </div>
        <div className="grid gap-[3px]" style={columns}>
          {activity.weeks.map((week, i) => (
            <div key={week[0].date} className={cn("flex flex-col gap-[3px]", i === 0 && "justify-end")}>
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} · ${formatDay(day.date, locale)}`}
                  className={cn("aspect-square w-full rounded-[2px]", LEVEL_CLASSES[level(day.count)])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AgenticSection({ locale }: { locale: Locale }) {
  const stats = activityStats(activity);
  const s = t[locale];
  const n = (value: number) => value.toLocaleString(locale);

  return (
    <section className="container mx-auto px-4 pt-16 max-w-6xl">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold mb-3">{agentic.title[locale]}</h2>
        <p className="text-lg text-muted-foreground">{agentic.intro[locale]}</p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
          <p>
            <span className="text-3xl font-bold tabular-nums">{n(stats.total)}</span>{" "}
            <span className="text-muted-foreground">{s.contributions}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {s.updated} {new Date(activity.updatedAt).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>

        <Heatmap activity={activity} locale={locale} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{s.private}</span>
          <span className="inline-flex items-center gap-1">
            {s.less}
            {LEVEL_CLASSES.map((c) => (
              <span key={c} className={cn("w-[11px] h-[11px] rounded-[2px]", c)} />
            ))}
            {s.more}
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-5 border-t pt-5">
          {[
            { value: n(stats.streak), label: s.streak },
            { value: n(stats.activeDays), label: `${s.activeDays} ${n(stats.totalDays)}` },
            { value: n(stats.best.count), label: `${s.bestDay} · ${formatDay(stats.best.date, locale)}` },
            ...agentic.metrics.map((m) => ({ value: m.value, label: m.label[locale] })),
          ].map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-2xl font-semibold tabular-nums">{m.value}</dd>
              <dd className="text-xs text-muted-foreground">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Below md: swipeable carousel with snap points; from md up, one row of five. */}
    </section>
  );
}
