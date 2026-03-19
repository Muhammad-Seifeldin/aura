import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { MAIN_USER_ID } from "@/lib/constants";
import type { Post } from "@/types";

async function fetchPosts(): Promise<Post[]> {
	const { data } = await axiosInstance.get(`/posts?userId=${MAIN_USER_ID}`);
	return data;
}

export function usePosts() {
	return useQuery({
		queryKey: ["posts", MAIN_USER_ID],
		queryFn: fetchPosts,
	});
}
