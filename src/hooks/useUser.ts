import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { MAIN_USER_ID } from "@/lib/constants";
import type { User } from "@/types";

async function fetchUser(): Promise<User> {
	const { data } = await axiosInstance.get(`/users/${MAIN_USER_ID}`);
	return data;
}

export function useUser() {
	return useQuery({
		queryKey: ["user", MAIN_USER_ID],
		queryFn: fetchUser,
	});
}
