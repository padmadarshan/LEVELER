'use client';

import { Task } from '@/lib/types';
import { Card } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { CheckCircle2, Circle, Trophy, Calendar, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

export function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`p-4 hover:shadow-lg transition-all ${
          task.completed ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => onComplete && onComplete(task.id)}
            className="mt-1"
            disabled={task.completed}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    task.completed ? 'line-through' : ''
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {task.xp_value} XP
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant={task.type === 'workout' ? 'destructive' : 'default'}>
                {task.type}
              </Badge>

              {task.due_date && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(task.due_date), 'MMM d')}
                </Badge>
              )}

              {task.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-1">
            {onEdit && !task.completed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
