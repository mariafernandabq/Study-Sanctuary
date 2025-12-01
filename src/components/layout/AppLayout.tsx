import { ReactNode } from 'react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  TrendingUp, 
  Coffee, 
  Sparkles, 
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/planejamento', label: 'Planejamento', icon: Calendar },
    { to: '/tarefas', label: 'Tarefas', icon: CheckSquare },
    { to: '/progresso', label: 'Progresso', icon: TrendingUp },
    { to: '/pausas', label: 'Pausas', icon: Coffee },
    { to: '/prompts', label: 'Prompts IA', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-calm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Agenda Inteligente</h1>
                <p className="text-xs text-muted-foreground">Organize com tranquilidade</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-full"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all whitespace-nowrap"
                activeClassName="bg-primary/10 text-primary"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido com 💙 como projeto acadêmico - IFCE
          </p>
        </div>
      </footer>
    </div>
  );
};
