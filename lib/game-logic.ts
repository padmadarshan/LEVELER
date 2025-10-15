import { UserProfile } from './types';

export function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(2, level - 1));
}

export function calculateLevel(totalXP: number): {
  level: number;
  currentLevelXP: number;
  xpToNextLevel: number;
} {
  let level = 1;
  let xpRemaining = totalXP;

  while (xpRemaining >= calculateXPForLevel(level)) {
    xpRemaining -= calculateXPForLevel(level);
    level++;
  }

  return {
    level,
    currentLevelXP: xpRemaining,
    xpToNextLevel: calculateXPForLevel(level),
  };
}

export function addXP(profile: UserProfile, xpToAdd: number): {
  profile: UserProfile;
  leveledUp: boolean;
  newLevel: number;
} {
  const newTotalXP = profile.total_xp + xpToAdd;
  const { level, currentLevelXP, xpToNextLevel } = calculateLevel(newTotalXP);

  const leveledUp = level > profile.level;

  return {
    profile: {
      ...profile,
      level,
      total_xp: newTotalXP,
      current_level_xp: currentLevelXP,
      xp_to_next_level: xpToNextLevel,
      updated_at: new Date().toISOString(),
    },
    leveledUp,
    newLevel: level,
  };
}

export function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = profile.last_activity_date;

  if (!lastActivity) {
    return {
      ...profile,
      current_streak: 1,
      longest_streak: Math.max(1, profile.longest_streak),
      last_activity_date: today,
    };
  }

  const lastDate = new Date(lastActivity);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    return profile;
  }

  if (diffDays === 1) {
    const newStreak = profile.current_streak + 1;
    return {
      ...profile,
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, profile.longest_streak),
      last_activity_date: today,
    };
  }

  return {
    ...profile,
    current_streak: 1,
    last_activity_date: today,
  };
}

export function checkBadgeEarned(
  profile: UserProfile,
  completedTasksCount: number,
  requirement_type: string,
  requirement_value: number
): boolean {
  switch (requirement_type) {
    case 'tasks_completed':
      return completedTasksCount >= requirement_value;
    case 'streak':
      return profile.current_streak >= requirement_value;
    case 'level':
      return profile.level >= requirement_value;
    case 'total_xp':
      return profile.total_xp >= requirement_value;
    default:
      return false;
  }
}

export function getProgressPercentage(current: number, target: number): number {
  return Math.min(100, Math.round((current / target) * 100));
}
