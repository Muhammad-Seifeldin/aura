import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "US & Canada", value: 50, color: "#c8964a" },
	{ name: "Europe", value: 25, color: "#1a1814" },
	{ name: "Middle East", value: 15, color: "#7a7570" },
	{ name: "Other", value: 10, color: "#efecea" },
];

interface LabelProps {
	cx?: number;
	cy?: number;
	midAngle?: number;
	innerRadius?: number;
	outerRadius?: number;
	percent?: number;
}

function renderCustomLabel({
	cx = 0,
	cy = 0,
	midAngle = 0,
	innerRadius = 0,
	outerRadius = 0,
	percent = 0,
}: LabelProps) {
	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor="middle"
			dominantBaseline="central"
			fontSize={11}
			fontWeight={500}
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
}
export default function AudienceChart() {
	return (
		<div className="flex items-center gap-6">
			<ResponsiveContainer width={140} height={140}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={38}
						outerRadius={65}
						dataKey="value"
						labelLine={false}
						label={renderCustomLabel}
					>
						{data.map((entry) => (
							<Cell key={entry.name} fill={entry.color} strokeWidth={0} />
						))}
					</Pie>
					<Tooltip
						formatter={(value) => `${Number(value)}%`}
						contentStyle={{
							backgroundColor: "#ffffff",
							border: "1px solid rgba(0,0,0,0.07)",
							borderRadius: "12px",
							fontSize: "12px",
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
			<div className="flex flex-col gap-2">
				{data.map((entry) => (
					<div key={entry.name} className="flex items-center gap-2">
						<div
							className="w-2 h-2 rounded-full shrink-0"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-xs text-[#7a7570] dark:text-[#857f78]">
							{entry.name} · {entry.value}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
