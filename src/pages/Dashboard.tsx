import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useData } from '@/contexts/DataContext';
import { Clock, CheckCircle, Target, Flame, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PAUSE_SUGGESTIONS = [
  '🧘 Faça 5 minutos de alongamento',
  '💧 Beba um copo de água',
  '👁️ Descanse os olhos por 2 minutos',
  '🚶 Dê uma volta rápida',
  '🎵 Ouça uma música relaxante',
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, getWeeklyStats } = useData();
  const stats = getWeeklyStats();
  
  const pendingTasks = tasks.filter(t => t.status === 'pendente').length;
  const todaysPause = PAUSE_SUGGESTIONS[new Date().getDay() % PAUSE_SUGGESTIONS.length];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Veja como está seu progresso esta semana</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-150">
          <StatCard
            title="Horas estudadas"
            value={stats.hoursStudied.toFixed(1)}
            subtitle="últimos 7 dias"
            icon={<Clock className="w-6 h-6" />}
            gradient="calm"
          />
          
          <StatCard
            title="Tarefas concluídas"
            value={stats.tasksCompleted}
            subtitle={`${pendingTasks} pendentes`}
            icon={<CheckCircle className="w-6 h-6" />}
            gradient="success"
          />
          
          <StatCard
            title="Sessões de estudo"
            value={stats.sessionsCompleted}
            subtitle="esta semana"
            icon={<Target className="w-6 h-6" />}
            gradient="accent"
          />
          
          <StatCard
            title="Sequência (streak)"
            value={`${stats.streak} dias`}
            subtitle="continue assim! 🎉"
            icon={<Flame className="w-6 h-6" />}
            gradient="warm"
          />
        </div>

        {/* Quick Actions & Pause Suggestion */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
          {/* Daily Pause */}
          <div className="card-soft p-6 bg-gradient-to-br from-accent-light to-accent">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-white">Sugestão de pausa do dia</h3>
                <p className="text-white/90 text-lg mb-4">{todaysPause}</p>
                <Button 
                  variant="secondary" 
                  className="rounded-full"
                  onClick={() => navigate('/pausas')}
                >
                  Ver mais pausas
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card-soft p-6">
            <h3 className="font-semibold text-lg mb-4">Ações rápidas</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl"
                onClick={() => navigate('/planejamento')}
              >
                📅 Criar novo planejamento
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl"
                onClick={() => navigate('/tarefas')}
              >
                ✅ Ver minhas tarefas
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl"
                onClick={() => navigate('/prompts')}
              >
                ✨ Explorar prompts de IA
              </Button>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="card-soft p-6 text-center bg-gradient-calm animate-in fade-in slide-in-from-bottom-10 duration-500 delay-500">
          <p className="text-xl font-medium text-primary-foreground">
            {stats.streak >= 3
              ? '🎉 Incrível! Você está mantendo uma ótima rotina de estudos!'
              : '💪 Continue estudando! Você está no caminho certo.'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
