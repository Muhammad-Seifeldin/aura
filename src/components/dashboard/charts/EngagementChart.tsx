import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ day: "Mon", rate: 3.8 },
	{ day: "Tue", rate: 4.2 },
	{ day: "Wed", rate: 3.5 },
	{ day: "Thu", rate: 5.1 },
	{ day: "Fri", rate: 6.3 },
	{ day: "Sat", rate: 4.8 },
	{ day: "Sun", rate: 4.7 },
];

export default function EngagementChart() {
	return (
		<ResponsiveContainer width="100%" height={180}>
			<LineChart data={data}>
				<CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" />
				<XAxis
					dataKey="day"
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: "#7a7570" }}
				/>
				<YAxis
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: "#7a7570" }}
					tickFormatter={(v) => `${v}%`}
					domain={[0, 8]}
				/>
				<Tooltip
					formatter={(value) => [
						`${Number(value).toFixed(1)}%`,
						"Engagement rate",
					]}
					contentStyle={{
						backgroundColor: "#ffffff",
						border: "1px solid rgba(0,0,0,0.07)",
						borderRadius: "12px",
						fontSize: "12px",
					}}
				/>
				<Line
					type="monotone"
					dataKey="rate"
					stroke="#c8964a"
					strokeWidth={2}
					dot={{ fill: "#c8964a", r: 3, strokeWidth: 0 }}
					activeDot={{ r: 5, strokeWidth: 0 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
