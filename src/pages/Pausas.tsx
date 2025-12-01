import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Coffee, Play, Pause, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PAUSE_SUGGESTIONS = [
  {
    title: 'Alongamento rápido',
    duration: 5,
    emoji: '🧘',
    description: 'Alongue braços, pescoço e costas para relaxar a musculatura',
  },
  {
    title: 'Respiração profunda',
    duration: 2,
    emoji: '🌬️',
    description: 'Inspire profundamente por 4s, segure por 4s, expire por 4s',
  },
  {
    title: 'Hidratação',
    duration: 3,
    emoji: '💧',
    description: 'Beba um copo de água e aproveite para andar um pouco',
  },
  {
    title: 'Descanso visual',
    duration: 2,
    emoji: '👁️',
    description: 'Olhe para longe por 20 segundos a cada 20 minutos de tela',
  },
  {
    title: 'Caminhada curta',
    duration: 10,
    emoji: '🚶',
    description: 'Dê uma volta rápida para oxigenar o cérebro',
  },
  {
    title: 'Música relaxante',
    duration: 5,
    emoji: '🎵',
    description: 'Ouça uma música calma e feche os olhos',
  },
];

const Pausas = () => {
  const [selectedPause, setSelectedPause] = useState(PAUSE_SUGGESTIONS[0]);
  const [timeLeft, setTimeLeft] = useState(selectedPause.duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(selectedPause.duration * 60);
  };

  const handleSelectPause = (pause: typeof PAUSE_SUGGESTIONS[0]) => {
    setSelectedPause(pause);
    setTimeLeft(pause.duration * 60);
    setIsActive(false);
  };

  const progress = ((selectedPause.duration * 60 - timeLeft) / (selectedPause.duration * 60)) * 100;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Pausas Inteligentes</h1>
          <p className="text-muted-foreground text-lg">Cuide da sua saúde mental durante os estudos</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <div className="card-soft p-8 text-center animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
            <div className="mb-6">
              <div className="text-8xl mb-4">{selectedPause.emoji}</div>
              <h2 className="text-2xl font-bold mb-2">{selectedPause.title}</h2>
              <p className="text-muted-foreground">{selectedPause.description}</p>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
              <Progress value={progress} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground">
                {selectedPause.duration} minutos de pausa
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              {!isActive ? (
                <Button
                  size="lg"
                  onClick={handleStart}
                  className="rounded-full px-8 bg-primary hover:bg-primary-dark"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handlePause}
                  variant="outline"
                  className="rounded-full px-8"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </Button>
              )}
              <Button
                size="lg"
                onClick={handleReset}
                variant="outline"
                className="rounded-full px-8"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Suggestions List */}
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-300">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Escolha sua pausa</h3>
            </div>

            {PAUSE_SUGGESTIONS.map((pause, index) => (
              <button
                key={index}
                onClick={() => handleSelectPause(pause)}
                className={`w-full text-left p-4 rounded-2xl border transition-all hover:shadow-card ${
                  selectedPause === pause
                    ? 'bg-primary/10 border-primary shadow-card'
                    : 'bg-card border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{pause.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{pause.title}</h4>
                      <span className="text-sm text-muted-foreground">{pause.duration} min</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pause.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="card-soft p-6 bg-gradient-to-br from-secondary-light to-secondary animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
          <h3 className="text-xl font-semibold mb-4 text-secondary-foreground">💡 Dicas importantes</h3>
          <ul className="space-y-2 text-secondary-foreground/90">
            <li className="flex gap-2">
              <span>•</span>
              <span>Faça pausas a cada 50 minutos de estudo intenso</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Durante a pausa, evite redes sociais e telas</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Hidrate-se regularmente ao longo do dia</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Alongue-se mesmo que não sinta desconforto</span>
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default Pausas;
