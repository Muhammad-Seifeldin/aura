import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import type { MetricData } from "@/types";

interface MetricCardProps {
	metric: MetricData;
	className?: string;
}

export default function MetricCard({ metric, className }: MetricCardProps) {
	return (
		<Card className={cn("flex flex-col gap-2", className)}>
			<span className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
				{metric.label}
			</span>
			<span className="text-3xl font-semibold text-[#1a1814] dark:text-[#f0ede8]">
				{metric.value}
			</span>
			<span
				className={cn(
					"inline-flex items-center gap-1 text-xs font-medium w-fit px-2 py-0.5 rounded-full",
					metric.up
						? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
						: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
				)}
			>
				{metric.up ? "▲" : "▼"} {metric.change} vs last week
			</span>
		</Card>
	);
}
