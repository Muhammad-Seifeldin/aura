// src/types/index.ts

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

export interface Comment {
	id: number;
	postId: number;
	name: string;
	email: string;
	body: string;
}

export interface Album {
	id: number;
	userId: number;
	title: string;
}

export interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

export interface InboxMessage {
	id: number;
	from: User;
	preview: string;
	time: string;
	unread: boolean;
}

export interface MetricData {
	label: string;
	value: string;
	change: string;
	up: boolean;
}

export interface ActivityItem {
	id: number;
	icon: string;
	bold?: string;
	text: string;
	time: string;
}

export interface EngagementData {
	label: string;
	value: number;
	pct: number;
	color: string;
}
