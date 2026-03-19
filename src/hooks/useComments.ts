import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { Comment } from "@/types";

async function fetchComments(): Promise<Comment[]> {
	const { data } = await axiosInstance.get("/comments");
	return data;
}

export function useComments() {
	return useQuery({
		queryKey: ["comments"],
		queryFn: fetchComments,
	});
}
