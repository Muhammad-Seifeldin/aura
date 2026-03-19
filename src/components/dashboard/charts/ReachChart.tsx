import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { formatNumber } from "@/lib/utils";

const data = [
	{ day: "Mon", organic: 8200, paid: 2100 },
	{ day: "Tue", organic: 9400, paid: 3200 },
	{ day: "Wed", organic: 7100, paid: 1800 },
	{ day: "Thu", organic: 11200, paid: 4100 },
	{ day: "Fri", organic: 13400, paid: 5200 },
	{ day: "Sat", organic: 10800, paid: 3900 },
	{ day: "Sun", organic: 9300, paid: 2800 },
];

export default function ReachChart() {
	return (
		<ResponsiveContainer width="100%" height={180}>
			<BarChart data={data} barSize={18} barGap={4}>
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
					tickFormatter={formatNumber}
				/>
				<Tooltip
					formatter={(value) => formatNumber(Number(value))}
					contentStyle={{
						backgroundColor: "#ffffff",
						border: "1px solid rgba(0,0,0,0.07)",
						borderRadius: "12px",
						fontSize: "12px",
					}}
				/>
				<Legend
					iconType="square"
					iconSize={8}
					wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
				/>
				<Bar
					dataKey="organic"
					name="Organic"
					fill="#c8964a"
					radius={[4, 4, 0, 0]}
					stackId="a"
				/>
				<Bar
					dataKey="paid"
					name="Paid"
					fill="#1a1814"
					radius={[4, 4, 0, 0]}
					stackId="a"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
