import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "ghost";
	size?: "sm" | "md";
	children: React.ReactNode;
}

const variants = {
	primary:
		"bg-[#c8964a] hover:bg-[#b8863a] text-white dark:bg-[#d4a45a] dark:hover:bg-[#e4b46a]",
	ghost:
		"bg-transparent hover:bg-[#efecea] text-[#7a7570] dark:hover:bg-[#242220] dark:text-[#857f78] border border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]",
};

const sizes = {
	sm: "px-3 py-1.5 text-xs",
	md: "px-4 py-2 text-sm",
};

export default function Button({
	variant = "primary",
	size = "md",
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				"inline-flex items-center gap-2 rounded-xl font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
				variants[variant],
				sizes[size],
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
