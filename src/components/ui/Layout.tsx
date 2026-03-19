import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/Sidebar";

export default function Layout() {
	return (
		<div className="flex min-h-screen bg-[#f5f4f1] dark:bg-[#0e0d0c]">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
