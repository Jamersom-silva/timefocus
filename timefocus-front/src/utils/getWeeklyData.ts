import { parseISO, format, subDays, isSameDay } from "date-fns";

export interface StudySession {
  tema: string;
  tempo: number;
  data: string;
}

export function getWeeklyData(): { day: string; sessions: number }[] {
  const raw = localStorage.getItem("sessoes") || "[]";
  const sessions: StudySession[] = JSON.parse(raw);

  const today = new Date();

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const day = subDays(today, 6 - i);
    const count = sessions.filter((s) =>
      isSameDay(parseISO(s.data), day)
    ).length;

    return {
      day: format(day, "EEE"), // ex: Mon, Tue...
      sessions: count,
    };
  });

  return last7Days;
}
