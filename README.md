# Leveler - Gamified Productivity App

A full-stack gamified productivity web application inspired by Solo Leveling, where users earn XP by completing workout and study tasks. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **XP System**: Earn experience points by completing tasks
- **Level Progression**: Exponential leveling system (100 → 200 → 400 → 800 XP per level)
- **Daily Streaks**: Track consecutive days of task completion
- **Task Management**: Full CRUD operations for workout and study tasks
- **Badge System**: Unlock achievements for milestones
- **Plans**: Import pre-made workout and study templates
- **Calendar View**: Visualize tasks across the week
- **Leaderboard**: Compare progress with others

### Design
- **Solo Leveling Theme**: Dark mode with blue and red accents
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Framer Motion transitions and confetti effects
- **Modern UI**: Built with shadcn/ui components

### Data Management
- **Local Storage**: All data stored in browser (no server required)
- **Export/Import**: Backup and restore your data as JSON
- **Privacy First**: No data collection or tracking

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## How XP Works

### Task Completion
- Create tasks with custom XP values (default: 10 XP)
- Complete tasks to earn XP
- XP accumulates toward your next level

### Leveling System
Each level requires exponentially more XP:
- Level 1 → 2: 100 XP
- Level 2 → 3: 200 XP
- Level 3 → 4: 400 XP
- Level 4 → 5: 800 XP
- Pattern continues: XP required doubles each level

### Streaks
- Complete at least one task per day to maintain your streak
- Streaks reset if you skip a day
- Earn the "Dedicated" badge at 7-day streak

### Badges
Unlock special achievements:
- **Novice Hunter**: Complete 10 tasks
- **Dedicated**: Maintain a 7-day streak
- **Rising Star**: Reach level 10

## Project Structure

```
leveler/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── tasks/             # Task management
│   ├── calendar/          # Weekly calendar view
│   ├── plans/             # Pre-made templates
│   ├── profile/           # User profile & badges
│   ├── leaderboard/       # Rankings
│   └── about/             # About page
├── components/
│   └── ui/                # Reusable components
├── lib/
│   ├── types.ts           # TypeScript types
│   ├── game-logic.ts      # XP calculation & leveling
│   ├── game-context.tsx   # Global state management
│   ├── storage.ts         # LocalStorage utilities
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Date Utilities**: date-fns
- **State Management**: React Context

## Privacy Notice

Leveler stores all user data locally in your browser using localStorage. No personal information is collected, stored on servers, or shared with third parties. You have complete control over your data and can export or delete it at any time from the Profile page.

## Deployment

This app is designed to deploy easily on Vercel:

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy (no environment variables needed)

Alternatively, deploy to any static hosting service that supports Next.js.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Code of Conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for community guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with passion for productivity and gamification.
