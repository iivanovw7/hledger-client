export const StatsChartPeriod = {
	MONTHLY: "Monthly",
	WEEKLY: "Weekly",
} as const;

export type StatsChartPeriod = (typeof StatsChartPeriod)[keyof typeof StatsChartPeriod];

export const StatsChartPeriods: StatsChartPeriod[] = [StatsChartPeriod.MONTHLY, StatsChartPeriod.WEEKLY];
