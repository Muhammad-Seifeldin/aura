import type { ActivityItem as ActivityItemType } from "@/types";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
	item: ActivityItemType;
	isLast?: boolean;
}

export default function ActivityItem({ item, isLast }: ActivityItemProps) {
	return (
		<div className="flex gap-3">
			<div className="flex flex-col items-center">
				<div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[#efecea] dark:bg-[#242220] border border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] shrink-0 z-10">
					{item.icon}
				</div>
				{!isLast && (
					<div className="w-px flex-1 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] my-1" />
				)}
			</div>
			<div className={cn("flex flex-col pb-4", isLast && "pb-0")}>
				<p className="text-sm text-[#1a1814] dark:text-[#f0ede8] leading-snug">
					{item.bold && <strong className="font-semibold">{item.bold} </strong>}
					{item.text}
				</p>
				<span className="text-xs text-[#b0ada8] dark:text-[#4a4640] mt-1">
					{item.time}
				</span>
			</div>
		</div>
	);
}
