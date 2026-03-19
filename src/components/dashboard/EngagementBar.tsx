import type { EngagementData } from "@/types";
import { formatNumber } from "@/lib/utils";

interface EngagementBarProps {
	data: EngagementData;
}

export default function EngagementBar({ data }: EngagementBarProps) {
	return (
		<div className="flex items-center gap-3">
			<span className="text-xs text-[#7a7570] dark:text-[#857f78] w-20 shrink-0">
				{data.label}
			</span>
			<div className="flex-1 h-1.5 bg-[#efecea] dark:bg-[#242220] rounded-full overflow-hidden">
				<div
					className="h-full rounded-full transition-all duration-500"
					style={{ width: `${data.pct}%`, backgroundColor: data.color }}
				/>
			</div>
			<span className="text-xs font-medium text-[#1a1814] dark:text-[#f0ede8] w-10 text-right shrink-0">
				{formatNumber(data.value)}
			</span>
		</div>
	);
}
