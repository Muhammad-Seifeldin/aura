import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Inbox from "@/pages/Inbox";
import Analytics from "@/pages/Analytics";
import Profile from "@/pages/Profile";
import Layout from "@/components/ui/Layout";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Navigate to="/dashboard" replace />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/inbox" element={<Inbox />} />
				<Route path="/analytics" element={<Analytics />} />
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Routes>
	);
}
