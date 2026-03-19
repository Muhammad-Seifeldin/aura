import Card from "@/components/ui/Card";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useTodos } from "@/hooks/useTodos";
import MetricCard from "@/components/dashboard/MetricCard";
import EngagementBar from "@/components/dashboard/EngagementBar";
import ReachChart from "@/components/dashboard/charts/ReachChart";
import EngagementChart from "@/components/dashboard/charts/EngagementChart";
import AudienceChart from "@/components/dashboard/charts/AudienceChart";
import { formatNumber } from "@/lib/utils";
import type { MetricData, EngagementData } from "@/types";

const METRICS: MetricData[] = [
	{ label: "Total reach", value: "184.2K", change: "+12.4%", up: true },
	{ label: "Impressions", value: "341.5K", change: "+8.1%", up: true },
	{ label: "Engagement rate", value: "4.7%", change: "-0.3%", up: false },
	{ label: "Profile visits", value: "12.3K", change: "+5.2%", up: true },
];

const ENGAGEMENT_DATA: EngagementData[] = [
	{ label: "Likes", value: 8241, pct: 62, color: "#c8964a" },
	{ label: "Comments", value: 1832, pct: 28, color: "#6366f1" },
	{ label: "Shares", value: 941, pct: 18, color: "#f59e0b" },
	{ label: "Saves", value: 2103, pct: 34, color: "#2d9e6b" },
	{ label: "Profile visits", value: 4412, pct: 48, color: "#3b82f6" },
];

export default function Analytics() {
	const { data: posts } = usePosts();
	const { data: comments } = useComments();
	const { data: todos } = useTodos();

	const completedTodos = todos ? todos.filter((t) => t.completed).length : 0;
	const totalTodos = todos ? todos.length : 0;
	const completionRate =
		totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

	const totalComments = comments ? comments.length : 0;
	const totalPosts = posts ? posts.length : 0;

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="mb-7">
				<h1 className="text-2xl font-semibold text-[#1a1814] dark:text-[#f0ede8]">
					Analytics
				</h1>
				<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-1">
					Your performance over the last 7 days
				</p>
			</div>

			<div className="grid grid-cols-4 gap-4 mb-4">
				{METRICS.map((m) => (
					<MetricCard key={m.label} metric={m} />
				))}
			</div>

			<div className="grid grid-cols-2 gap-4 mb-4">
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Post reach · last 7 days
					</p>
					<ReachChart />
				</Card>
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Engagement rate · last 7 days
					</p>
					<EngagementChart />
				</Card>
			</div>

			<div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Engagement breakdown
					</p>
					<div className="flex flex-col gap-3">
						{ENGAGEMENT_DATA.map((e) => (
							<EngagementBar key={e.label} data={e} />
						))}
					</div>
				</Card>
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Audience by region
					</p>
					<AudienceChart />
				</Card>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Content summary
					</p>
					<div className="flex flex-col gap-4">
						{[
							{ label: "Total posts", value: formatNumber(totalPosts) },
							{ label: "Total comments", value: formatNumber(totalComments) },
							{
								label: "Avg. comments",
								value:
									totalPosts > 0
										? (totalComments / totalPosts).toFixed(1)
										: "0",
							},
						].map((s) => (
							<div key={s.label} className="flex items-center justify-between">
								<span className="text-sm text-[#7a7570] dark:text-[#857f78]">
									{s.label}
								</span>
								<span className="text-sm font-semibold text-[#1a1814] dark:text-[#f0ede8]">
									{s.value}
								</span>
							</div>
						))}
					</div>
				</Card>

				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Task completion
					</p>
					<div className="flex flex-col items-center justify-center gap-3">
						<div className="relative w-24 h-24">
							<svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
								<title>Task completion rate</title>
								<circle
									cx="18"
									cy="18"
									r="15.9"
									fill="none"
									stroke="#efecea"
									strokeWidth="3"
								/>
								<circle
									cx="18"
									cy="18"
									r="15.9"
									fill="none"
									stroke="#c8964a"
									strokeWidth="3"
									strokeDasharray={`${completionRate} 100`}
									strokeLinecap="round"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-lg font-semibold text-[#1a1814] dark:text-[#f0ede8]">
									{completionRate}%
								</span>
							</div>
						</div>
						<p className="text-xs text-[#7a7570] dark:text-[#857f78]">
							{completedTodos} of {totalTodos} tasks done
						</p>
					</div>
				</Card>

				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Top metrics
					</p>
					<div className="flex flex-col gap-4">
						{[
							{ label: "Best day", value: "Friday" },
							{ label: "Best post type", value: "Photos" },
							{ label: "Peak hour", value: "6:00 PM" },
						].map((s) => (
							<div key={s.label} className="flex items-center justify-between">
								<span className="text-sm text-[#7a7570] dark:text-[#857f78]">
									{s.label}
								</span>
								<span className="text-sm font-semibold text-[#1a1814] dark:text-[#f0ede8]">
									{s.value}
								</span>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
