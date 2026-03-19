import { cn } from "@/lib/utils";

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export default function Card({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				"bg-white dark:bg-[#1a1917] border border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-5",
				className,
			)}
		>
			{children}
		</div>
	);
}
