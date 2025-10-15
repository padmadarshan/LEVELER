import { UserProfile, Task, UserBadge } from './types';

const STORAGE_KEYS = {
  PROFILE: 'leveler_profile',
  TASKS: 'leveler_tasks',
  BADGES: 'leveler_badges',
};

export function saveProfile(profile: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }
}

export function loadProfile(): UserProfile | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }
}

export function loadTasks(): Task[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function saveBadges(badges: UserBadge[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }
}

export function loadBadges(): UserBadge[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function exportData(): string {
  return JSON.stringify({
    profile: loadProfile(),
    tasks: loadTasks(),
    badges: loadBadges(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    if (data.profile) saveProfile(data.profile);
    if (data.tasks) saveTasks(data.tasks);
    if (data.badges) saveBadges(data.badges);
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
}

export function clearAllData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.BADGES);
  }
}
