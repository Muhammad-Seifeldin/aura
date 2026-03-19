import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import type { InboxMessage } from "@/types";

interface InboxItemProps {
	message: InboxMessage;
	onClick?: () => void;
}

export default function InboxItem({ message, onClick }: InboxItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex items-center gap-3 px-3 py-2.5 rounded-xl w-full cursor-pointer transition-colors duration-150 text-left",
				"hover:bg-[#efecea] dark:hover:bg-[#242220]",
				message.unread && "border-l-2 border-[#c8964a] dark:border-[#d4a45a]",
			)}
		>
			<Avatar userId={message.from.id} name={message.from.name} size="sm" />
			<div className="flex-1 min-w-0">
				<p
					className={cn(
						"text-sm text-[#1a1814] dark:text-[#f0ede8] truncate",
						message.unread ? "font-semibold" : "font-medium",
					)}
				>
					{message.from.name}
				</p>
				<p
					className={cn(
						"text-xs truncate mt-0.5",
						message.unread
							? "text-[#1a1814] dark:text-[#f0ede8]"
							: "text-[#7a7570] dark:text-[#857f78]",
					)}
				>
					{message.preview}
				</p>
			</div>
			<span className="text-xs text-[#b0ada8] dark:text-[#4a4640] shrink-0">
				{message.time}
			</span>
		</button>
	);
}
