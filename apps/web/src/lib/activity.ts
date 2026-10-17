// GitHub contribution calendar, shared by the Pages Function, the snapshot script and the UI.
// The calendar only carries daily counts, so private contributions show up without exposing repos.

export const GITHUB_LOGIN = "Jarrioja";

export interface ActivityDay {
  date: string;
  count: number;
}

export interface Activity {
  total: number;
  /** Weeks from oldest to newest, each Sunday → Saturday as GitHub returns them. */
  weeks: ActivityDay[][];
  updatedAt: string;
}

export const ACTIVITY_QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

interface CalendarResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    };
  };
}

export async function fetchActivity(token: string): Promise<Activity> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "jesusarrioja.com",
    },
    body: JSON.stringify({ query: ACTIVITY_QUERY, variables: { login: GITHUB_LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

  const json = (await res.json()) as CalendarResponse;
  const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) throw new Error("GitHub GraphQL returned no calendar");

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function activityStats(activity: Activity) {
  const days = activity.weeks.flat();
  const activeDays = days.filter((d) => d.count > 0).length;
  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);

  // A streak still counts when today has no activity yet.
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else if (i < days.length - 1) break;
  }

  return { total: activity.total, activeDays, totalDays: days.length, streak, best };
}

/** Maps a count to 0–4 using quartiles of the active days, like GitHub's legend. */
export function levelScale(activity: Activity) {
  const counts = activity.weeks
    .flat()
    .map((d) => d.count)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  const q = (p: number) => counts[Math.floor((counts.length - 1) * p)] ?? 0;
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];

  return (count: number) => (count === 0 ? 0 : count <= q1 ? 1 : count <= q2 ? 2 : count <= q3 ? 3 : 4);
}
