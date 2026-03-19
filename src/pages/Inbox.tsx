import { useComments } from "@/hooks/useComments";
import { useUser } from "@/hooks/useUser";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { InboxMessage } from "@/types";

const TIME_LABELS = [
	"2m",
	"14m",
	"1h",
	"3h",
	"5h",
	"2h",
	"3h",
	"4h",
	"6h",
	"Yesterday",
	"Yesterday",
	"Yesterday",
];

export default function Inbox() {
	const { data: comments, isLoading } = useComments();
	const { data: user } = useUser();
	const [selected, setSelected] = useState<InboxMessage | null>(null);

	if (isLoading || !comments || !user) {
		return (
			<div className="flex items-center justify-center h-screen text-sm text-[#7a7570] dark:text-[#857f78]">
				Loading...
			</div>
		);
	}

	const uniqueUsers = [
		...new Map(comments.map((c) => [c.email, c])).values(),
	].slice(0, 12);

	const messages: InboxMessage[] = uniqueUsers.map((c, i) => ({
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

	const selectedMessages = selected
		? comments.filter((c) => c.email === selected.from.email).slice(0, 4)
		: [];

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="mb-7">
				<h1 className="text-2xl font-semibold text-[#1a1814] dark:text-[#f0ede8]">
					Inbox
				</h1>
				<p className="text-sm text-[#7a7570] dark:text-[#857f78] mt-1">
					{messages.filter((m) => m.unread).length} unread messages
				</p>
			</div>

			<div className="grid grid-cols-[1fr_1.6fr] gap-4">
				<Card className="p-0 overflow-hidden">
					<div className="p-4 border-b border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)]">
						<p className="text-xs font-medium uppercase tracking-widest text-[#b0ada8] dark:text-[#4a4640]">
							Messages
						</p>
					</div>
					<div className="flex flex-col">
						{messages.map((msg) => (
							<button
								key={msg.id}
								type="button"
								onClick={() => setSelected(msg)}
								className={cn(
									"flex items-center gap-3 px-4 py-3 w-full text-left cursor-pointer transition-colors duration-150 border-b border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)]",
									"hover:bg-[#efecea] dark:hover:bg-[#242220]",
									selected?.id === msg.id && "bg-[#efecea] dark:bg-[#242220]",
									msg.unread && "border-l-2 border-l-[#c8964a]",
								)}
							>
								<Avatar userId={msg.from.id} name={msg.from.name} size="sm" />
								<div className="flex-1 min-w-0">
									<p
										className={cn(
											"text-sm text-[#1a1814] dark:text-[#f0ede8] truncate",
											msg.unread ? "font-semibold" : "font-medium",
										)}
									>
										{msg.from.name}
									</p>
									<p className="text-xs text-[#7a7570] dark:text-[#857f78] truncate mt-0.5">
										{msg.preview}
									</p>
								</div>
								<span className="text-xs text-[#b0ada8] dark:text-[#4a4640] shrink-0">
									{msg.time}
								</span>
							</button>
						))}
					</div>
				</Card>

				<Card>
					{selected ? (
						<div className="flex flex-col h-full">
							<div className="flex items-center gap-3 pb-4 border-b border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] mb-4">
								<Avatar
									userId={selected.from.id}
									name={selected.from.name}
									size="md"
								/>
								<div>
									<p className="text-sm font-semibold text-[#1a1814] dark:text-[#f0ede8]">
										{selected.from.name}
									</p>
									<p className="text-xs text-[#7a7570] dark:text-[#857f78]">
										{selected.from.email}
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-4 flex-1">
								{selectedMessages.map((msg) => (
									<div
										key={msg.id}
										className={cn(
											"flex gap-3",
											msg.id % 2 === 0 ? "flex-row" : "flex-row-reverse",
										)}
									>
										{msg.id % 2 === 0 ? (
											<Avatar
												userId={selected.from.id}
												name={selected.from.name}
												size="sm"
											/>
										) : (
											<Avatar userId={user.id} name={user.name} size="sm" />
										)}
										<div
											className={cn(
												"max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
												msg.id % 2 === 0
													? "bg-[#efecea] dark:bg-[#242220] text-[#1a1814] dark:text-[#f0ede8] rounded-tl-sm"
													: "bg-[#c8964a] dark:bg-[#d4a45a] text-white rounded-tr-sm",
											)}
										>
											{msg.body}
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-64 text-center">
							<p className="text-sm font-medium text-[#1a1814] dark:text-[#f0ede8]">
								Select a message
							</p>
							<p className="text-xs text-[#7a7570] dark:text-[#857f78] mt-1">
								Choose a conversation from the left to read it
							</p>
						</div>
					)}
				</Card>
			</div>
		</div>
	);
}
