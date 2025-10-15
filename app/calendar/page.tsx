'use client';

import { useGame } from '@/lib/game-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { TaskCard } from '@/components/ui/task-card';
import { LevelUpModal } from '@/components/ui/level-up-modal';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CalendarPage() {
  const { tasks, completeTask, deleteTask } = useGame();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(1);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleCompleteTask = (taskId: string) => {
    const { leveledUp, newLevel } = completeTask(taskId);
    toast.success('Task completed! +XP earned');

    if (leveledUp) {
      setLeveledUpTo(newLevel);
      setShowLevelUp(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">Weekly view of your tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayTasks = tasks.filter((task) => {
            if (!task.due_date) return false;
            return isSameDay(new Date(task.due_date), day);
          });

          const isToday = isSameDay(day, new Date());
          const completedCount = dayTasks.filter((t) => t.completed).length;

          return (
            <Card
              key={day.toISOString()}
              className={`p-4 ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="mb-3">
                <div className="text-sm text-muted-foreground">
                  {format(day, 'EEE')}
                </div>
                <div className="text-2xl font-bold">{format(day, 'd')}</div>
                {isToday && (
                  <Badge variant="default" className="mt-1">
                    Today
                  </Badge>
                )}
              </div>

              {dayTasks.length > 0 && (
                <Badge variant="secondary" className="mb-2">
                  {completedCount}/{dayTasks.length}
                </Badge>
              )}

              <div className="space-y-2">
                {dayTasks.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No tasks</p>
                ) : (
                  dayTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={handleCompleteTask}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <LevelUpModal
        open={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={leveledUpTo}
      />
    </div>
  );
}
