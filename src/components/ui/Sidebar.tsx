import { NavLink } from "react-router-dom";
import { LayoutDashboard, Inbox, BarChart2, User } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

const NAV_ITEMS = [
	{ to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
	{ to: "/inbox", icon: Inbox, label: "Inbox" },
	{ to: "/analytics", icon: BarChart2, label: "Analytics" },
	{ to: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
	const { theme, setTheme } = useTheme();

	return (
		<aside className="w-64 min-h-screen sticky top-0 h-screen flex flex-col bg-white dark:bg-[#1a1917] border-r border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]">
			<div className="px-6 py-6 border-b border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]">
				<Logo />
			</div>

			<nav className="flex flex-col gap-1 p-4 flex-1">
				{NAV_ITEMS.map(({ to, icon: Icon, label }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							cn(
								"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
								isActive
									? "bg-[#efecea] dark:bg-[#242220] text-[#1a1814] dark:text-[#f0ede8]"
									: "text-[#7a7570] dark:text-[#857f78] hover:bg-[#efecea] dark:hover:bg-[#242220] hover:text-[#1a1814] dark:hover:text-[#f0ede8]",
							)
						}
					>
						<Icon size={18} />
						{label}
					</NavLink>
				))}
			</nav>

			<div className="p-4 border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]">
				<button
					type="button"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#7a7570] dark:text-[#857f78] hover:bg-[#efecea] dark:hover:bg-[#242220] hover:text-[#1a1814] dark:hover:text-[#f0ede8] transition-colors duration-150 w-full"
				>
					{theme === "dark" ? "☀" : "☾"}{" "}
					{theme === "dark" ? "Light mode" : "Dark mode"}
				</button>
			</div>
		</aside>
	);
}
