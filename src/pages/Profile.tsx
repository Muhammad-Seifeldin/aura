import { useUser } from "@/hooks/useUser";
import { usePosts } from "@/hooks/usePosts";
import { useTodos } from "@/hooks/useTodos";
import { useAlbums } from "@/hooks/useAlbums";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";

const FOLLOWERS = 24831;
const FOLLOWING = 612;

export default function Profile() {
	const { data: user, isLoading } = useUser();
	const { data: posts } = usePosts();
	const { data: todos } = useTodos();
	const { data: albums } = useAlbums();

	if (isLoading || !user) {
		return (
			<div className="flex items-center justify-center h-screen text-sm text-[#7a7570] dark:text-[#857f78]">
				Loading...
			</div>
		);
	}

	const completedTodos = todos ? todos.filter((t) => t.completed).length : 0;
	const totalTodos = todos ? todos.length : 0;

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="mb-7">
				<h1 className="text-2xl font-semibold text-[#1a1814] dark:text-[#f0ede8]">
					Profile
				</h1>
				<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-1">
					Your public profile and account details
				</p>
			</div>

			<div className="grid grid-cols-[1fr_1.8fr] gap-4 mb-4">
				<Card className="flex flex-col items-center text-center gap-4">
					<Avatar userId={user.id} name={user.name} size="lg" />
					<div>
						<div className="flex items-center justify-center gap-2">
							<p className="text-base font-semibold text-[#1a1814] dark:text-[#f0ede8]">
								{user.name}
							</p>
							<span className="w-4 h-4 bg-[#6366f1] rounded-full flex items-center justify-center text-white text-[9px]">
								✓
							</span>
						</div>
						<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-0.5">
							@{user.username}
						</p>
					</div>
					<div className="flex gap-6 w-full justify-center border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] pt-4">
						{[
							{
								label: "Posts",
								value: formatNumber((posts?.length ?? 0) * 10),
							},
							{ label: "Followers", value: formatNumber(FOLLOWERS) },
							{ label: "Following", value: formatNumber(FOLLOWING) },
						].map((s) => (
							<div key={s.label} className="text-center">
								<p className="text-sm font-semibold text-[#1a1814] dark:text-[#f0ede8]">
									{s.value}
								</p>
								<p className="text-xs text-[#7a7570] dark:text-[#857f78] mt-0.5">
									{s.label}
								</p>
							</div>
						))}
					</div>
					<Button variant="ghost" size="sm" className="w-full justify-center">
						Edit profile
					</Button>
				</Card>

				<div className="flex flex-col gap-4">
					<Card>
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
							Account info
						</p>
						<div className="flex flex-col gap-3">
							{[
								{ label: "Full name", value: user.name },
								{ label: "Username", value: `@${user.username}` },
								{ label: "Email", value: user.email },
								{ label: "Phone", value: user.phone },
								{ label: "Website", value: user.website },
								{ label: "Company", value: user.company.name },
							].map((s) => (
								<div
									key={s.label}
									className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] last:border-none"
								>
									<span className="text-sm text-[#7a7570] dark:text-[#857f78]">
										{s.label}
									</span>
									<span className="text-sm font-medium text-[#1a1814] dark:text-[#f0ede8]">
										{s.value}
									</span>
								</div>
							))}
						</div>
					</Card>

					<Card>
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
							Address
						</p>
						<div className="flex flex-col gap-3">
							{[
								{
									label: "Street",
									value: `${user.address.street}, ${user.address.suite}`,
								},
								{ label: "City", value: user.address.city },
								{ label: "Zipcode", value: user.address.zipcode },
							].map((s) => (
								<div
									key={s.label}
									className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] last:border-none"
								>
									<span className="text-sm text-[#7a7570] dark:text-[#857f78]">
										{s.label}
									</span>
									<span className="text-sm font-medium text-[#1a1814] dark:text-[#f0ede8]">
										{s.value}
									</span>
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4">
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Recent posts
					</p>
					<div className="flex flex-col gap-3">
						{posts?.slice(0, 4).map((post) => (
							<div
								key={post.id}
								className="flex flex-col gap-1 py-2 border-b border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] last:border-none"
							>
								<p className="text-sm font-medium text-[#1a1814] dark:text-[#f0ede8] capitalize truncate">
									{post.title}
								</p>
								<p className="text-xs text-[#7a7570] dark:text-[#857f78] line-clamp-2">
									{post.body}
								</p>
							</div>
						))}
					</div>
				</Card>

				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Albums
					</p>
					<div className="flex flex-col gap-2">
						{albums?.slice(0, 6).map((album) => (
							<div
								key={album.id}
								className="flex items-center gap-3 py-2 border-b border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] last:border-none"
							>
								<div className="w-8 h-8 rounded-lg bg-[#efecea] dark:bg-[#242220] flex items-center justify-center text-sm shrink-0">
									🖼
								</div>
								<p className="text-sm text-[#1a1814] dark:text-[#f0ede8] truncate capitalize">
									{album.title}
								</p>
							</div>
						))}
					</div>
				</Card>

				<Card>
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
							Tasks
						</p>
						<Badge
							label={`${completedTodos}/${totalTodos}`}
							variant="default"
						/>
					</div>
					<div className="flex flex-col gap-2">
						{todos?.slice(0, 8).map((todo) => (
							<div key={todo.id} className="flex items-center gap-3 py-1.5">
								<div
									className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
										todo.completed
											? "bg-[#c8964a] border-[#c8964a]"
											: "border-[rgba(0,0,0,0.15)] dark:border-[rgba(255,255,255,0.15)]"
									}`}
								>
									{todo.completed && (
										<span className="text-white text-[8px]">✓</span>
									)}
								</div>
								<p
									className={`text-sm truncate ${
										todo.completed
											? "line-through text-[#b0ada8] dark:text-[#4a4640]"
											: "text-[#1a1814] dark:text-[#f0ede8]"
									}`}
								>
									{todo.title}
								</p>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
