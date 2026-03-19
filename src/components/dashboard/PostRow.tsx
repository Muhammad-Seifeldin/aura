import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
import type { Post } from "@/types";

interface PostRowProps {
	post: Post;
	reach: number;
	likes: number;
	comments: number;
	shares: number;
	className?: string;
}

export default function PostRow({
	post,
	reach,
	likes,
	comments,
	shares,
	className,
}: PostRowProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 py-3 border-b border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] last:border-none",
				className,
			)}
		>
			<div className="w-10 h-10 rounded-lg bg-[#efecea] dark:bg-[#242220] flex items-center justify-center text-lg shrink-0">
				📸
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-[#1a1814] dark:text-[#f0ede8] truncate capitalize">
					{post.title}
				</p>
				<p className="text-xs text-[#7a7570] dark:text-[#857f78] mt-0.5">
					❤ {formatNumber(likes)} · 💬 {formatNumber(comments)} · 🔁{" "}
					{formatNumber(shares)}
				</p>
			</div>
			<span className="text-xs font-medium text-[#7a7570] dark:text-[#857f78] bg-[#efecea] dark:bg-[#242220] px-2.5 py-1 rounded-full shrink-0">
				{formatNumber(reach)}
			</span>
		</div>
	);
}
