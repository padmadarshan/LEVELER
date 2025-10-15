'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { TaskCard } from '@/components/ui/task-card';
import { LevelUpModal } from '@/components/ui/level-up-modal';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Flame,
  Target,
  Plus,
  Dumbbell,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Dashboard() {
  const { profile, tasks, completeTask, addTask } = useGame();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(1);
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskType, setQuickTaskType] = useState<'workout' | 'study'>('workout');
  const [quickTaskXP, setQuickTaskXP] = useState(10);

  const todayTasks = tasks.filter((task) => {
    if (!task.due_date) return true;
    const today = new Date().toISOString().split('T')[0];
    return task.due_date === today;
  });

  const incompleteTasks = todayTasks.filter((t) => !t.completed).slice(0, 5);
  const completedToday = todayTasks.filter((t) => t.completed);

  const todayXP = completedToday.reduce((sum, task) => sum + task.xp_value, 0);
  const progressToGoal = Math.min(
    100,
    Math.round((todayXP / profile.daily_xp_goal) * 100)
  );

  const handleCompleteTask = (taskId: string) => {
    const { leveledUp, newLevel } = completeTask(taskId);

    toast.success('Task completed! +XP earned', {
      description: 'Keep up the great work!',
    });

    if (leveledUp) {
      setLeveledUpTo(newLevel);
      setShowLevelUp(true);
    }
  };

  const handleQuickAdd = () => {
    if (!quickTaskTitle.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask({
      user_id: profile.id,
      title: quickTaskTitle,
      type: quickTaskType,
      xp_value: quickTaskXP,
      completed: false,
      due_date: new Date().toISOString().split('T')[0],
    });

    setQuickTaskTitle('');
    toast.success('Task added successfully!');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {profile.username}
            </h1>
            <p className="text-muted-foreground">
              Track your progress and level up!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-3xl font-bold">{profile.level}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-3xl font-bold">{profile.current_streak} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-3xl font-bold">{profile.total_xp}</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">XP Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Level {profile.level}</span>
                <span className="text-sm text-muted-foreground">
                  {profile.current_level_xp} / {profile.xp_to_next_level} XP
                </span>
              </div>
              <ProgressBar
                current={profile.current_level_xp}
                max={profile.xp_to_next_level}
                glowing
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Daily Goal</span>
                <span className="text-sm text-muted-foreground">
                  {todayXP} / {profile.daily_xp_goal} XP ({progressToGoal}%)
                </span>
              </div>
              <ProgressBar
                current={todayXP}
                max={profile.daily_xp_goal}
                barClassName="bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Add Task</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Task title..."
              value={quickTaskTitle}
              onChange={(e) => setQuickTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickAdd()}
              className="flex-1"
            />
            <Select value={quickTaskType} onValueChange={(v: any) => setQuickTaskType(v)}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workout">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4" />
                    Workout
                  </div>
                </SelectItem>
                <SelectItem value="study">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Study
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="XP"
              value={quickTaskXP}
              onChange={(e) => setQuickTaskXP(Number(e.target.value))}
              className="w-full md:w-[100px]"
              min={1}
            />
            <Button onClick={handleQuickAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Today&apos;s Tasks</h2>
            <Badge variant="secondary">
              {completedToday.length} / {todayTasks.length} completed
            </Badge>
          </div>

          {incompleteTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tasks for today. Add one above to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {incompleteTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleCompleteTask}
                />
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <LevelUpModal
        open={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={leveledUpTo}
      />
    </div>
  );
}
