import { useMemo, type CSSProperties } from "react";
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
    mergedPrs: "PRs merged in the last year",
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
    mergedPrs: "PRs mergeados en el último año",
    updated: "GitHub · actualizado al",
    less: "Menos",
    more: "Más",
    private: "Incluye repositorios privados. Solo conteos.",
  },
};

// Static snapshot, refreshed daily by the activity workflow.
const activity: Activity = activityData;

function formatDay(date: string, locale: Locale) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale, { day: "numeric", month: "short" });
}

// Weeks shown below `sm`; the full year needs a wider screen to stay legible.
const MOBILE_WEEKS = 13;

function Heatmap({ activity, locale }: { activity: Activity; locale: Locale }) {
  const level = useMemo(() => levelScale(activity), [activity]);
  const { weeks } = activity;
  const firstMobileWeek = weeks.length - MOBILE_WEEKS;

  const columns = {
    "--weeks": weeks.length,
    "--mobile-weeks": MOBILE_WEEKS,
  } as CSSProperties;
  const gridClass =
    "grid gap-[3px] grid-cols-[repeat(var(--mobile-weeks),minmax(0,1fr))] sm:grid-cols-[repeat(var(--weeks),minmax(0,1fr))]";
  // Weeks before the mobile window only render from `sm` up.
  const hiddenOnMobile = (i: number) => i < firstMobileWeek && "hidden sm:flex";
  const monthOf = (date: string) => new Date(`${date}T12:00:00`).getMonth();

  return (
    <div style={columns}>
      <div className={cn(gridClass, "text-[10px] text-muted-foreground mb-1")}>
        {weeks.map((week, i) => {
          // Label the first week of each month (and of the mobile window), skipping a partial month at the right edge.
          const isNewMonth = i === 0 || monthOf(week[0].date) !== monthOf(weeks[i - 1][0].date);
          const isMobileStart = i === firstMobileWeek && !isNewMonth;
          return (
            <span
              key={week[0].date}
              className={cn("whitespace-nowrap overflow-visible", hiddenOnMobile(i), isMobileStart && "sm:invisible")}
            >
              {(isNewMonth || isMobileStart) && i < weeks.length - 2
                ? new Date(`${week[0].date}T12:00:00`).toLocaleDateString(locale, { month: "short" })
                : ""}
            </span>
          );
        })}
      </div>
      <div className={gridClass}>
        {weeks.map((week, i) => (
          <div
            key={week[0].date}
            className={cn("flex flex-col gap-[3px]", i === 0 && "justify-end", hiddenOnMobile(i))}
          >
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
            { value: n(activity.mergedPrs), label: s.mergedPrs },
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

    </section>
  );
}
