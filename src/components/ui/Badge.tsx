import { cn } from "@/lib/utils";

interface BadgeProps {
	label: string;
	variant?: "default" | "success" | "danger" | "warning";
	className?: string;
}

const variants = {
	default: "bg-[#efecea] text-[#7a7570] dark:bg-[#242220] dark:text-[#857f78]",
	success:
		"bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
	danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
	warning:
		"bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function Badge({
	label,
	variant = "default",
	className,
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
				variants[variant],
				className,
			)}
		>
			{label}
		</span>
	);
}
