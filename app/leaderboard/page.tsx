'use client';

import { useGame } from '@/lib/game-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { id: '1', username: 'Shadow Monarch', level: 20, total_xp: 10485, avatar_url: '' },
  { id: '2', username: 'Iron Fist', level: 18, total_xp: 7340, avatar_url: '' },
  { id: '3', username: 'Storm Breaker', level: 15, total_xp: 5100, avatar_url: '' },
  { id: '4', username: 'Night Hawk', level: 12, total_xp: 3072, avatar_url: '' },
  { id: '5', username: 'Flame Dancer', level: 10, total_xp: 2047, avatar_url: '' },
];

export default function LeaderboardPage() {
  const { profile } = useGame();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const allEntries = [
    ...MOCK_LEADERBOARD,
    {
      id: profile.id,
      username: profile.username,
      level: profile.level,
      total_xp: profile.total_xp,
      avatar_url: profile.avatar_url,
    },
  ]
    .sort((a, b) => b.total_xp - a.total_xp)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top hunters by total XP
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-3">
          {allEntries.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = entry.id === profile.id;

            return (
              <Card
                key={entry.id}
                className={`p-4 ${
                  isCurrentUser
                    ? 'ring-2 ring-primary bg-primary/5'
                    : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(rank)}
                  </div>

                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent">
                      {entry.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{entry.username}</h3>
                      {isCurrentUser && (
                        <Badge variant="default">You</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Level {entry.level}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {entry.total_xp.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Total XP</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <h2 className="text-xl font-bold mb-2">Your Ranking</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-2xl font-bold">
              #{allEntries.findIndex((e) => e.id === profile.id) + 1}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="text-2xl font-bold">{profile.level}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total XP</p>
            <p className="text-2xl font-bold">{profile.total_xp}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
