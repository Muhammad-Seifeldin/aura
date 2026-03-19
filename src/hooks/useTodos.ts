import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { MAIN_USER_ID } from "@/lib/constants";
import type { Todo } from "@/types";

async function fetchTodos(): Promise<Todo[]> {
	const { data } = await axiosInstance.get(`/todos?userId=${MAIN_USER_ID}`);
	return data;
}

export function useTodos() {
	return useQuery({
		queryKey: ["todos", MAIN_USER_ID],
		queryFn: fetchTodos,
	});
}
