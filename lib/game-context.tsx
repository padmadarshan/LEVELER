'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserProfile, Task, UserBadge, Badge } from './types';
import {
  saveProfile,
  loadProfile,
  saveTasks,
  loadTasks,
  saveBadges,
  loadBadges,
} from './storage';
import {
  addXP,
  updateStreak,
  checkBadgeEarned,
  calculateXPForLevel,
} from './game-logic';

interface GameContextType {
  profile: UserProfile;
  tasks: Task[];
  userBadges: UserBadge[];
  updateProfile: (profile: UserProfile) => void;
  completeTask: (taskId: string) => { leveledUp: boolean; newLevel: number };
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  earnBadge: (badge: Badge) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-user',
  username: 'Hunter',
  level: 1,
  total_xp: 0,
  current_level_xp: 0,
  xp_to_next_level: 100,
  current_streak: 0,
  longest_streak: 0,
  daily_xp_goal: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedProfile = loadProfile();
    const loadedTasks = loadTasks();
    const loadedBadges = loadBadges();

    if (loadedProfile) setProfile(loadedProfile);
    if (loadedTasks.length > 0) setTasks(loadedTasks);
    if (loadedBadges.length > 0) setUserBadges(loadedBadges);

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveProfile(profile);
    }
  }, [profile, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveBadges(userBadges);
    }
  }, [userBadges, isLoaded]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.completed) {
      return { leveledUp: false, newLevel: profile.level };
    }

    const updatedStreak = updateStreak(profile);
    const { profile: updatedProfile, leveledUp, newLevel } = addXP(
      updatedStreak,
      task.xp_value
    );

    setProfile(updatedProfile);

    const completedTask = {
      ...task,
      completed: true,
      completed_at: new Date().toISOString(),
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? completedTask : t))
    );

    const completedCount = tasks.filter((t) => t.completed).length + 1;

    if (completedCount === 10) {
      earnBadge({
        id: 'badge-10-tasks',
        name: 'Novice Hunter',
        description: 'Complete 10 tasks',
        icon: 'trophy',
        requirement_type: 'tasks_completed',
        requirement_value: 10,
        created_at: new Date().toISOString(),
      });
    }

    if (updatedProfile.current_streak === 7) {
      earnBadge({
        id: 'badge-7-streak',
        name: 'Dedicated',
        description: '7-day streak',
        icon: 'flame',
        requirement_type: 'streak',
        requirement_value: 7,
        created_at: new Date().toISOString(),
      });
    }

    if (newLevel === 10) {
      earnBadge({
        id: 'badge-level-10',
        name: 'Rising Star',
        description: 'Reach level 10',
        icon: 'star',
        requirement_type: 'level',
        requirement_value: 10,
        created_at: new Date().toISOString(),
      });
    }

    return { leveledUp, newLevel };
  };

  const addTask = (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const earnBadge = (badge: Badge) => {
    const alreadyEarned = userBadges.some((ub) => ub.badge_id === badge.id);
    if (alreadyEarned) return;

    const newBadge: UserBadge = {
      id: `user-badge-${Date.now()}`,
      user_id: profile.id,
      badge_id: badge.id,
      earned_at: new Date().toISOString(),
      badge,
    };

    setUserBadges((prev) => [...prev, newBadge]);
  };

  return (
    <GameContext.Provider
      value={{
        profile,
        tasks,
        userBadges,
        updateProfile,
        completeTask,
        addTask,
        updateTask,
        deleteTask,
        earnBadge,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
