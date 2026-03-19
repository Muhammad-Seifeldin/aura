// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
	if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
	if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
	return n.toString();
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

export function getAvatarColor(id: number): string {
	const colors = [
		"#6366f1",
		"#f59e0b",
		"#10b981",
		"#ef4444",
		"#3b82f6",
		"#8b5cf6",
		"#ec4899",
		"#14b8a6",
	];
	return colors[id % colors.length];
}
