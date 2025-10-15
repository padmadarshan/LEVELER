'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskCard } from '@/components/ui/task-card';
import { LevelUpModal } from '@/components/ui/level-up-modal';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function TasksPage() {
  const { profile, tasks, addTask, updateTask, deleteTask, completeTask } = useGame();
  const [filterType, setFilterType] = useState<'all' | 'workout' | 'study'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'workout' as 'workout' | 'study',
    xp_value: 10,
    tags: '',
    due_date: '',
  });

  let filteredTasks = tasks;

  if (filterType !== 'all') {
    filteredTasks = filteredTasks.filter((t) => t.type === filterType);
  }

  if (filterStatus === 'active') {
    filteredTasks = filteredTasks.filter((t) => !t.completed);
  } else if (filterStatus === 'completed') {
    filteredTasks = filteredTasks.filter((t) => t.completed);
  }

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask({
      user_id: profile.id,
      title: newTask.title,
      description: newTask.description || undefined,
      type: newTask.type,
      xp_value: newTask.xp_value,
      tags: newTask.tags ? newTask.tags.split(',').map((t) => t.trim()) : undefined,
      completed: false,
      due_date: newTask.due_date || undefined,
    });

    setNewTask({
      title: '',
      description: '',
      type: 'workout',
      xp_value: 10,
      tags: '',
      due_date: '',
    });

    setIsDialogOpen(false);
    toast.success('Task created successfully!');
  };

  const handleCompleteTask = (taskId: string) => {
    const { leveledUp, newLevel } = completeTask(taskId);
    toast.success('Task completed! +XP earned');

    if (leveledUp) {
      setLeveledUpTo(newLevel);
      setShowLevelUp(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast.success('Task deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage all your tasks</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Task description (optional)..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select
                    value={newTask.type}
                    onValueChange={(v: any) => setNewTask({ ...newTask, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workout">Workout</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">XP Value</label>
                  <Input
                    type="number"
                    value={newTask.xp_value}
                    onChange={(e) =>
                      setNewTask({ ...newTask, xp_value: Number(e.target.value) })
                    }
                    min={1}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                <Input
                  placeholder="e.g., cardio, push-day, math"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Due Date</label>
                <Input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
              </div>

              <Button onClick={handleAddTask} className="w-full">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="workout">Workout</SelectItem>
              <SelectItem value="study">Study</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Badge variant="secondary" className="ml-auto">
            {filteredTasks.length} tasks
          </Badge>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center text-muted-foreground">
            <p>No tasks found. Create your first task!</p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <LevelUpModal
        open={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={leveledUpTo}
      />
    </div>
  );
}
