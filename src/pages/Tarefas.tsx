import { AppLayout } from '@/components/layout/AppLayout';
import { useData } from '@/contexts/DataContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Tarefas = () => {
  const { tasks, updateTaskStatus, toggleSubtask } = useData();
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  const toggleExpand = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const difficultyColors = {
    facil: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    medio: 'bg-accent/20 text-accent-foreground border-accent/30',
    dificil: 'bg-warm/20 text-warm-foreground border-warm/30',
  };

  const difficultyLabels = {
    facil: '😊 Fácil',
    medio: '🤔 Médio',
    dificil: '😰 Difícil',
  };

  const statusIcons = {
    pendente: <Clock className="w-4 h-4" />,
    'em-andamento': <AlertCircle className="w-4 h-4" />,
    concluida: <CheckCircle2 className="w-4 h-4" />,
  };

  const statusColors = {
    pendente: 'text-muted-foreground',
    'em-andamento': 'text-primary',
    concluida: 'text-secondary',
  };

  const statusLabels = {
    pendente: 'Pendente',
    'em-andamento': 'Em andamento',
    concluida: 'Concluída',
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Minhas Tarefas</h1>
          <p className="text-muted-foreground text-lg">Organize e acompanhe seu progresso</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-150">
          <div className="card-soft p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{tasks.filter(t => t.status === 'pendente').length}</p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </div>
          <div className="card-soft p-4 text-center">
            <p className="text-2xl font-bold text-primary">{tasks.filter(t => t.status === 'em-andamento').length}</p>
            <p className="text-sm text-muted-foreground">Em andamento</p>
          </div>
          <div className="card-soft p-4 text-center">
            <p className="text-2xl font-bold text-secondary">{tasks.filter(t => t.status === 'concluida').length}</p>
            <p className="text-sm text-muted-foreground">Concluídas</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
          {tasks.map((task) => {
            const isExpanded = expandedTasks.includes(task.id);
            const daysUntilDeadline = Math.ceil(
              (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div key={task.id} className="card-soft p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className={cn('p-2 rounded-xl', statusColors[task.status])}>
                    {statusIcons[task.status]}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        {task.subtasks && task.subtasks.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(task.id)}
                            className="flex-shrink-0"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="rounded-full">
                          📚 {task.subject}
                        </Badge>
                        <Badge variant="outline" className={cn('rounded-full', difficultyColors[task.difficulty])}>
                          {difficultyLabels[task.difficulty]}
                        </Badge>
                        <Badge variant="outline" className="rounded-full">
                          📅 {daysUntilDeadline > 0 ? `${daysUntilDeadline} dias` : 'Hoje'}
                        </Badge>
                      </div>
                    </div>

                    {/* Subtasks */}
                    {isExpanded && task.subtasks && task.subtasks.length > 0 && (
                      <div className="pl-4 border-l-2 border-border space-y-2">
                        <p className="text-sm font-medium text-muted-foreground mb-3">Subtarefas:</p>
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                            <Checkbox
                              checked={subtask.completed}
                              onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <p className={cn('text-sm', subtask.completed && 'line-through text-muted-foreground')}>
                                {subtask.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(subtask.deadline).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {task.status !== 'em-andamento' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => updateTaskStatus(task.id, 'em-andamento')}
                        >
                          Iniciar
                        </Button>
                      )}
                      {task.status !== 'concluida' && (
                        <Button
                          size="sm"
                          className="rounded-full bg-secondary hover:bg-secondary/90"
                          onClick={() => updateTaskStatus(task.id, 'concluida')}
                        >
                          Concluir
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Tarefas;
