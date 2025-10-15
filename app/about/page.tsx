'use client';

import { Card } from '@/components/ui/card';
import { Trophy, Zap, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">About Leveler</h1>
        <p className="text-muted-foreground">
          A gamified productivity app inspired by Solo Leveling
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="p-3 bg-primary/20 rounded-lg h-fit">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Create Tasks</h3>
              <p className="text-sm text-muted-foreground">
                Add workout or study tasks with custom XP values. Break down your goals
                into manageable steps.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-accent/20 rounded-lg h-fit">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Earn XP & Level Up</h3>
              <p className="text-sm text-muted-foreground">
                Complete tasks to earn experience points. As you accumulate XP, you&apos;ll
                level up with exponential progression (100 → 200 → 400 → 800 XP per level).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-orange-500/20 rounded-lg h-fit">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Build Streaks</h3>
              <p className="text-sm text-muted-foreground">
                Complete tasks daily to build your streak. Maintain consistency and
                watch your streak counter grow!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg h-fit">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Unlock Badges</h3>
              <p className="text-sm text-muted-foreground">
                Earn special badges for milestones like completing 10 tasks, maintaining
                a 7-day streak, or reaching level 10.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">XP System</h2>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Level 1:</strong> 100 XP required
          </p>
          <p className="text-sm">
            <strong>Level 2:</strong> 200 XP required (300 total)
          </p>
          <p className="text-sm">
            <strong>Level 3:</strong> 400 XP required (700 total)
          </p>
          <p className="text-sm">
            <strong>Level 4:</strong> 800 XP required (1500 total)
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Each level requires 2x the XP of the previous level, creating exponential
            progression that rewards consistent effort.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Privacy & Data</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            All your data is stored locally in your browser using localStorage. No
            account creation or server sync is required.
          </p>
          <p>
            You can export your data at any time from the Profile page as a JSON file,
            and import it later to restore your progress.
          </p>
          <p>
            This app does not collect, store, or transmit any personal information to
            external servers.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <h2 className="text-2xl font-bold mb-2">Built With</h2>
        <p className="text-sm text-muted-foreground">
          Next.js, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, and Lucide Icons
        </p>
      </Card>
    </div>
  );
}
