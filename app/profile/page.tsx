'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Flame, Target, Download, Upload, User } from 'lucide-react';
import { exportData, importData } from '@/lib/storage';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { profile, userBadges, updateProfile } = useGame();
  const [username, setUsername] = useState(profile.username);
  const [dailyGoal, setDailyGoal] = useState(profile.daily_xp_goal);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    updateProfile({
      ...profile,
      username,
      daily_xp_goal: dailyGoal,
    });
    setIsEditing(false);
    toast.success('Profile updated!');
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leveler-export-${new Date().toISOString()}.json`;
    a.click();
    toast.success('Data exported successfully!');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importData(content);
      if (success) {
        toast.success('Data imported successfully! Refresh to see changes.');
      } else {
        toast.error('Failed to import data');
      }
    };
    reader.readAsText(file);
  };

  const allBadges = [
    {
      id: 'badge-10-tasks',
      name: 'Novice Hunter',
      description: 'Complete 10 tasks',
      icon: 'trophy',
    },
    {
      id: 'badge-7-streak',
      name: 'Dedicated',
      description: '7-day streak',
      icon: 'flame',
    },
    {
      id: 'badge-level-10',
      name: 'Rising Star',
      description: 'Reach level 10',
      icon: 'star',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your hunter profile</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-accent">
              {profile.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Username</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Daily XP Goal
                  </label>
                  <Input
                    type="number"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    min={1}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-3xl font-bold">{profile.username}</h2>
                  <p className="text-muted-foreground">Level {profile.level} Hunter</p>
                </div>
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <label>
                <Upload className="w-4 h-4" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total XP</p>
              <p className="text-2xl font-bold">{profile.total_xp}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold">{profile.longest_streak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Goal</p>
              <p className="text-2xl font-bold">{profile.daily_xp_goal} XP</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
            const earned = userBadges.some((ub) => ub.badge_id === badge.id);

            return (
              <Card
                key={badge.id}
                className={`p-4 ${earned ? '' : 'opacity-40'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      earned
                        ? 'bg-gradient-to-br from-primary to-accent'
                        : 'bg-secondary'
                    }`}
                  >
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
                    {earned && (
                      <Badge variant="default" className="mt-1">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
