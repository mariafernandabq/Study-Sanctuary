import { AppLayout } from '@/components/layout/AppLayout';
import { useData } from '@/contexts/DataContext';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Progresso = () => {
  const { tasks, studySessions, getWeeklyStats } = useData();
  const stats = getWeeklyStats();

  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === 'concluida').length / tasks.length) * 100) 
    : 0;

  const subjectHours = studySessions.reduce((acc, session) => {
    acc[session.subject] = (acc[session.subject] || 0) + session.duration / 60;
    return acc;
  }, {} as Record<string, number>);

  const topSubjects = Object.entries(subjectHours)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dailyStudy = weekDays.map((day, index) => {
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() - (6 - index));
    const sessions = studySessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate.toDateString() === dayDate.toDateString();
    });
    const hours = sessions.reduce((sum, s) => sum + s.duration, 0) / 60;
    return { day, hours };
  });

  const maxHours = Math.max(...dailyStudy.map(d => d.hours), 1);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Seu Progresso</h1>
          <p className="text-muted-foreground text-lg">Visualize sua evolução e conquistas</p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-150">
          <div className="card-soft p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Taxa de conclusão</h3>
                <p className="text-sm text-muted-foreground">Todas as tarefas</p>
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={completionRate} className="h-3" />
              <p className="text-3xl font-bold">{completionRate}%</p>
            </div>
          </div>

          <div className="card-soft p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-secondary/10">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Horas totais</h3>
                <p className="text-sm text-muted-foreground">Esta semana</p>
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.hoursStudied.toFixed(1)}h</p>
            <p className="text-sm text-muted-foreground mt-2">
              Média de {(stats.hoursStudied / 7).toFixed(1)}h por dia
            </p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="card-soft p-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Atividade semanal</h3>
              <p className="text-sm text-muted-foreground">Horas estudadas por dia</p>
            </div>
          </div>

          <div className="space-y-4">
            {dailyStudy.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.hours.toFixed(1)}h</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-calm rounded-full transition-all duration-500"
                    style={{ width: `${(item.hours / maxHours) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="card-soft p-6 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-warm/10">
              <Award className="w-6 h-6 text-warm" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Disciplinas mais estudadas</h3>
              <p className="text-sm text-muted-foreground">Total de horas dedicadas</p>
            </div>
          </div>

          <div className="space-y-4">
            {topSubjects.length > 0 ? (
              topSubjects.map(([subject, hours], index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-success flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{subject}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{hours.toFixed(1)}h</span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma sessão de estudo registrada ainda
              </p>
            )}
          </div>
        </div>

        {/* Motivational Card */}
        {stats.streak >= 3 && (
          <div className="card-soft p-6 text-center bg-gradient-calm animate-in fade-in slide-in-from-bottom-12 duration-500 delay-700">
            <p className="text-2xl font-bold text-primary-foreground mb-2">
              🔥 Você está em chamas!
            </p>
            <p className="text-primary-foreground/90">
              {stats.streak} dias de estudos consecutivos. Continue assim!
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Progresso;
