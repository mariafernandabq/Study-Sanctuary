import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Heart, 
  Sparkles, 
  Calendar, 
  TrendingUp,
  CheckCircle2,
  Coffee
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Planejamento Inteligente',
      description: 'Organize seus estudos com cronogramas personalizados baseados em suas preferências.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Task Breaker',
      description: 'Divida tarefas complexas em passos menores e conquiste seus objetivos.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Acompanhamento Visual',
      description: 'Veja seu progresso através de gráficos claros e motivadores.',
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Pausas Inteligentes',
      description: 'Recomendações de descanso para manter sua saúde mental em dia.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Prompts de IA',
      description: 'Templates prontos para turbinar seus estudos com inteligência artificial.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Foco no Bem-Estar',
      description: 'Produtividade com equilíbrio. Sua saúde mental importa.',
    },
  ];

  const benefits = [
    'Reduza a ansiedade com organização clara',
    'Aumente seu foco dividindo grandes tarefas',
    'Mantenha a motivação com feedback visual',
    'Cuide da sua saúde mental durante os estudos',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Projeto Acadêmico IFCE</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Organize seus estudos com{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                tranquilidade
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              A Agenda Inteligente transforma a organização dos seus estudos em uma fonte de controle e bem-estar. 
              Menos estresse, mais aprendizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg shadow-hover bg-primary hover:bg-primary-dark"
                onClick={() => navigate('/signup')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Começar agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg"
                onClick={() => navigate('/login')}
              >
                Já tenho conta
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements decoration */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000" />
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por que usar a Agenda Inteligente?
            </h2>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades pensadas para você</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para estudar de forma organizada e saudável
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-soft card-hover p-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-calm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-primary-foreground">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-calm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            Pronto para transformar seus estudos?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Junte-se a estudantes que já descobriram como estudar com mais tranquilidade e eficiência.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg bg-background text-foreground hover:bg-background/90 shadow-lg"
            onClick={() => navigate('/signup')}
          >
            Criar minha conta gratuita
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
