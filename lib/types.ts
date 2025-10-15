export interface UserProfile {
  id: string;
  username: string;
  avatar_url?: string;
  level: number;
  total_xp: number;
  current_level_xp: number;
  xp_to_next_level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  daily_xp_goal: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: 'workout' | 'study';
  xp_value: number;
  tags?: string[];
  completed: boolean;
  completed_at?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  type: 'workout' | 'study';
  tasks: PlanTask[];
  created_at: string;
}

export interface PlanTask {
  title: string;
  description?: string;
  xp_value: number;
  tags?: string[];
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar_url?: string;
  level: number;
  total_xp: number;
}
