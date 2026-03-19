import { useUser } from "@/hooks/useUser";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useTodos } from "@/hooks/useTodos";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/dashboard/MetricCard";
import InboxItem from "@/components/dashboard/InboxItem";
import PostRow from "@/components/dashboard/PostRow";
import ActivityItem from "@/components/dashboard/ActivityItem";
import EngagementBar from "@/components/dashboard/EngagementBar";
import ReachChart from "@/components/dashboard/charts/ReachChart";
import AudienceChart from "@/components/dashboard/charts/AudienceChart";
import { formatNumber } from "@/lib/utils";
import type {
	MetricData,
	InboxMessage,
	ActivityItem as ActivityItemType,
	EngagementData,
} from "@/types";

const FOLLOWERS = 24831;
const FOLLOWING = 612;
const TOTAL_REACH = 184200;
const IMPRESSIONS = 341500;
const ENG_RATE = 4.7;

const TIME_LABELS = ["2m", "14m", "1h", "3h", "5h", "Yesterday"];

const ENGAGEMENT_DATA: EngagementData[] = [
	{ label: "Likes", value: 8241, pct: 62, color: "#c8964a" },
	{ label: "Comments", value: 1832, pct: 28, color: "#6366f1" },
	{ label: "Shares", value: 941, pct: 18, color: "#f59e0b" },
	{ label: "Saves", value: 2103, pct: 34, color: "#2d9e6b" },
	{ label: "Profile visits", value: 4412, pct: 48, color: "#3b82f6" },
];

const POST_STATS = [
	{ reach: 18400, likes: 2341, comments: 184, shares: 412 },
	{ reach: 12800, likes: 1823, comments: 97, shares: 231 },
	{ reach: 9200, likes: 1102, comments: 64, shares: 178 },
	{ reach: 7400, likes: 891, comments: 43, shares: 134 },
];

export default function Dashboard() {
	const { data: user, isLoading: userLoading } = useUser();
	const { data: posts } = usePosts();
	const { data: comments } = useComments();
	const { data: todos } = useTodos();

	if (userLoading || !user) {
		return (
			<div className="flex items-center justify-center h-screen text-sm text-[#7a7570] dark:text-[#857f78]">
				Loading...
			</div>
		);
	}

	const now = new Date();
	const dateStr = now.toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const firstName = user.name.split(" ")[0];

	const metrics: MetricData[] = [
		{
			label: "Total reach",
			value: formatNumber(TOTAL_REACH),
			change: "+12.4%",
			up: true,
		},
		{
			label: "Impressions",
			value: formatNumber(IMPRESSIONS),
			change: "+8.1%",
			up: true,
		},
		{
			label: "Engagement rate",
			value: `${ENG_RATE}%`,
			change: "-0.3%",
			up: false,
		},
	];

	const otherUsers = comments
		? [...new Map(comments.map((c) => [c.email, c])).values()].slice(0, 6)
		: [];

	const inboxMessages: InboxMessage[] = otherUsers.map((c, i) => ({
		id: i,
		from: {
			id: i + 2,
			name: c.name,
			username: c.email.split("@")[0],
			email: c.email,
			phone: "",
			website: "",
			address: {
				street: "",
				suite: "",
				city: "",
				zipcode: "",
				geo: { lat: "", lng: "" },
			},
			company: { name: "", catchPhrase: "", bs: "" },
		},
		preview: c.body,
		time: TIME_LABELS[i],
		unread: i < 3,
	}));

	const completedTodos = todos ? todos.filter((t) => t.completed).length : 0;
	const totalTodos = todos ? todos.length : 0;

	const activityItems: ActivityItemType[] = [
		{
			id: 1,
			icon: "❤",
			bold: otherUsers[0]?.name ?? "Someone",
			text: "liked your post",
			time: "2 minutes ago",
		},
		{
			id: 2,
			icon: "💬",
			bold: otherUsers[1]?.name ?? "Someone",
			text: "commented on your post",
			time: "18 minutes ago",
		},
		{
			id: 3,
			icon: "👤",
			bold: otherUsers[2]?.name ?? "Someone",
			text: "started following you",
			time: "1 hour ago",
		},
		{
			id: 4,
			icon: "🔁",
			bold: otherUsers[3]?.name ?? "Someone",
			text: "shared your post",
			time: "3 hours ago",
		},
		{
			id: 5,
			icon: "📌",
			text: "Your post was featured in Explore",
			time: "5 hours ago",
		},
		{
			id: 6,
			icon: "✅",
			text: `${completedTodos} of ${totalTodos} scheduled tasks completed today`,
			time: "This morning",
		},
	];

	const myPosts = posts ? posts.slice(0, 4) : [];

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex items-start justify-between mb-7">
				<div>
					<h1 className="text-2xl font-semibold text-[#1a1814] dark:text-[#f0ede8]">
						Good morning, {firstName} ✦
					</h1>
					<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-1">
						{dateStr}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm">
						↑ Export
					</Button>
					<Button variant="primary" size="sm">
						+ New Post
					</Button>
				</div>
			</div>

			<Card className="flex items-center gap-5 mb-5">
				<Avatar userId={user.id} name={user.name} size="lg" />
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<p className="text-base font-semibold text-[#1a1814] dark:text-[#f0ede8]">
							{user.name}
						</p>
						<span className="w-4 h-4 bg-[#6366f1] rounded-full flex items-center justify-center text-white text-[9px]">
							✓
						</span>
					</div>
					<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-0.5">
						@{user.username} · {user.email}
					</p>
				</div>
				<div className="flex gap-7">
					{[
						{ label: "Posts", value: formatNumber((posts?.length ?? 0) * 10) },
						{ label: "Followers", value: formatNumber(FOLLOWERS) },
						{ label: "Following", value: formatNumber(FOLLOWING) },
					].map((s) => (
						<div key={s.label} className="text-center">
							<p className="text-base font-semibold text-[#1a1814] dark:text-[#f0ede8]">
								{s.value}
							</p>
							<p className="text-xs text-[#7a7570] dark:text-[#857f78] mt-0.5">
								{s.label}
							</p>
						</div>
					))}
				</div>
			</Card>

			<div className="grid grid-cols-3 gap-4 mb-4">
				{metrics.map((m) => (
					<MetricCard key={m.label} metric={m} />
				))}
			</div>

			<div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
				<Card>
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
							Post reach · last 7 days
						</p>
						<span className="text-xs text-[#c8964a] cursor-pointer">
							Details →
						</span>
					</div>
					<ReachChart />
					<div className="flex gap-5 mt-4">
						{[
							{ label: "Organic", value: formatNumber(69400) },
							{ label: "Paid", value: formatNumber(23100) },
							{ label: "Peak day", value: "Friday" },
						].map((s) => (
							<div key={s.label}>
								<p className="text-xs text-[#b0ada8] dark:text-[#4a4640]">
									{s.label}
								</p>
								<p className="text-sm font-semibold text-[#1a1814] dark:text-[#f0ede8] mt-0.5">
									{s.value}
								</p>
							</div>
						))}
					</div>
				</Card>

				<Card>
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
							Inbox
						</p>
						<span className="text-xs text-[#c8964a]">3 unread</span>
					</div>
					<div className="flex flex-col gap-1">
						{inboxMessages.map((msg) => (
							<InboxItem key={msg.id} message={msg} />
						))}
					</div>
				</Card>
			</div>

			<div className="grid grid-cols-[1.4fr_1fr] gap-4">
				<Card>
					<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
						Engagement breakdown
					</p>
					<div className="flex flex-col gap-3 mb-6">
						{ENGAGEMENT_DATA.map((e) => (
							<EngagementBar key={e.label} data={e} />
						))}
					</div>
					<div className="border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] pt-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-3">
							Top performing posts
						</p>
						{myPosts.map((post, i) => (
							<PostRow
								key={post.id}
								post={post}
								reach={POST_STATS[i].reach}
								likes={POST_STATS[i].likes}
								comments={POST_STATS[i].comments}
								shares={POST_STATS[i].shares}
							/>
						))}
					</div>
				</Card>

				<Card>
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
							Activity
						</p>
						<span className="text-xs text-[#c8964a] cursor-pointer">
							All activity →
						</span>
					</div>
					<div className="flex flex-col mb-6">
						{activityItems.map((item, i) => (
							<ActivityItem
								key={item.id}
								item={item}
								isLast={i === activityItems.length - 1}
							/>
						))}
					</div>
					<div className="border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] pt-4">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640] mb-4">
							Audience
						</p>
						<AudienceChart />
					</div>
				</Card>
			</div>
		</div>
	);
}
