'use client';

import { useGame } from '@/lib/game-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, BookOpen, Plus } from 'lucide-react';
import { toast } from 'sonner';

const WORKOUT_PLANS = [
  {
    id: 'plan-1',
    name: 'Beginner Strength',
    description: '4-week program for building foundational strength',
    type: 'workout',
    tasks: [
      { title: 'Push-ups: 3 sets of 10', xp_value: 15, tags: ['strength', 'upper-body'] },
      { title: 'Squats: 3 sets of 15', xp_value: 15, tags: ['strength', 'lower-body'] },
      { title: 'Plank: 3 sets of 30s', xp_value: 10, tags: ['core'] },
      { title: 'Rest Day', xp_value: 5, tags: ['recovery'] },
    ],
  },
  {
    id: 'plan-2',
    name: 'Cardio Blast',
    description: 'High-intensity cardio workouts',
    type: 'workout',
    tasks: [
      { title: '30-min Run', xp_value: 25, tags: ['cardio', 'running'] },
      { title: 'Jump Rope: 5 rounds of 2 min', xp_value: 20, tags: ['cardio'] },
      { title: 'Burpees: 5 sets of 10', xp_value: 20, tags: ['cardio', 'hiit'] },
    ],
  },
];

const STUDY_PLANS = [
  {
    id: 'plan-3',
    name: 'Programming Fundamentals',
    description: 'Learn the basics of programming',
    type: 'study',
    tasks: [
      { title: 'Variables and Data Types', xp_value: 20, tags: ['programming', 'basics'] },
      { title: 'Control Flow: If/Else', xp_value: 20, tags: ['programming'] },
      { title: 'Loops and Iteration', xp_value: 20, tags: ['programming'] },
      { title: 'Functions and Methods', xp_value: 25, tags: ['programming'] },
    ],
  },
  {
    id: 'plan-4',
    name: 'Math Skills Boost',
    description: 'Daily math practice',
    type: 'study',
    tasks: [
      { title: 'Algebra Practice: 20 problems', xp_value: 15, tags: ['math', 'algebra'] },
      { title: 'Geometry Review', xp_value: 15, tags: ['math', 'geometry'] },
      { title: 'Calculus Concepts', xp_value: 20, tags: ['math', 'calculus'] },
    ],
  },
];

const ALL_PLANS = [...WORKOUT_PLANS, ...STUDY_PLANS];

export default function PlansPage() {
  const { profile, addTask } = useGame();

  const handleImportPlan = (plan: typeof ALL_PLANS[0]) => {
    let imported = 0;

    plan.tasks.forEach((taskTemplate) => {
      addTask({
        user_id: profile.id,
        title: taskTemplate.title,
        type: plan.type as 'workout' | 'study',
        xp_value: taskTemplate.xp_value,
        tags: taskTemplate.tags,
        completed: false,
      });
      imported++;
    });

    toast.success(`Imported ${imported} tasks from ${plan.name}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Plans</h1>
        <p className="text-muted-foreground">
          Pre-made workout and study templates
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-red-500" />
          Workout Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKOUT_PLANS.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <Badge variant="destructive">{plan.type}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                {plan.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{task.title}</span>
                    <Badge variant="outline">{task.xp_value} XP</Badge>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleImportPlan(plan)}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                Import Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Study Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDY_PLANS.map((plan) => (
            <Card key={plan.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <Badge variant="default">{plan.type}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                {plan.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{task.title}</span>
                    <Badge variant="outline">{task.xp_value} XP</Badge>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleImportPlan(plan)}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                Import Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
