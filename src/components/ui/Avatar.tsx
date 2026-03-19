import { getInitials, getAvatarColor } from "@/lib/utils";
import avatar from "@/assets/avatar.jpg";
import { MAIN_USER_ID } from "@/lib/constants";

interface AvatarProps {
	userId: number;
	name: string;
	size?: "sm" | "md" | "lg";
}

const sizes = {
	sm: "w-8 h-8 text-xs",
	md: "w-10 h-10 text-sm",
	lg: "w-14 h-14 text-lg",
};

export default function Avatar({ userId, name, size = "md" }: AvatarProps) {
	const isMain = userId === MAIN_USER_ID;

	if (isMain) {
		return (
			<img
				src={avatar}
				alt={name}
				className={`${sizes[size]} rounded-full object-cover`}
			/>
		);
	}

	return (
		<div
			className={`${sizes[size]} rounded-full flex items-center justify-center font-medium text-white shrink-0`}
			style={{ backgroundColor: getAvatarColor(userId) }}
		>
			{getInitials(name)}
		</div>
	);
}
