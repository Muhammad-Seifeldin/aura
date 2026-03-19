import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { MAIN_USER_ID } from "@/lib/constants";
import type { Album } from "@/types";

async function fetchAlbums(): Promise<Album[]> {
	const { data } = await axiosInstance.get(`/albums?userId=${MAIN_USER_ID}`);
	return data;
}

export function useAlbums() {
	return useQuery({
		queryKey: ["albums", MAIN_USER_ID],
		queryFn: fetchAlbums,
	});
}
