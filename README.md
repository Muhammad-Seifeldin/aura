# Aura — Creator Analytics Dashboard

A social media analytics dashboard built with React, TypeScript, and Vite. Designed to give creators a clean overview of their content performance, audience, inbox, and activity.

> **Note:** This project is currently desktop-only. Mobile and responsive layouts are not yet implemented.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **React Router DOM** — client-side routing
- **TanStack Query** + **Axios** — data fetching and caching
- **Recharts** — analytics charts
- **Motion** — animations
- **next-themes** — dark/light mode
- **Lucide React** — icons
- **Radix UI** — accessible UI primitives
- **Biome** — linting and formatting

## Data Source

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock REST API. Metric and engagement data is static and used for UI demonstration purposes.

## Pages

- **Dashboard** — overview of reach, impressions, engagement, inbox, activity, and audience
- **Inbox** — messages from other users with a conversation view
- **Analytics** — detailed charts and performance breakdown
- **Profile** — user info, posts, albums, and task completion

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── assets/
├── components/
│   ├── ui/
│   └── dashboard/
│       └── charts/
├── hooks/
├── lib/
├── pages/
├── providers/
├── types/
├── App.tsx
└── main.tsx
```

## Notes

- Dark/light mode toggles from the sidebar and respects system preference by default
- The main user avatar is a local image at `src/assets/avatar.jpg`
- Other user avatars are generated from initials with a color derived from their user ID
- All chart data is static mock data — replace with real API data when connecting a backend
