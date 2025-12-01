import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Plus, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Planejamento = () => {
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular geração de cronograma
    toast.success('Cronograma gerado com sucesso! 📅', {
      description: 'Suas tarefas foram organizadas automaticamente.',
    });
    
    setSubject('');
    setDeadline('');
    setDifficulty('medio');
  };

  const suggestedSchedule = [
    { day: 'Segunda', subject: 'Matemática', time: '14:00 - 15:30', topic: 'Funções trigonométricas' },
    { day: 'Terça', subject: 'História', time: '16:00 - 17:30', topic: 'Revolução Industrial' },
    { day: 'Quarta', subject: 'Biologia', time: '14:00 - 15:00', topic: 'Fotossíntese' },
    { day: 'Quinta', subject: 'Português', time: '15:00 - 16:30', topic: 'Análise sintática' },
    { day: 'Sexta', subject: 'Revisão', time: '14:00 - 16:00', topic: 'Tópicos da semana' },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold mb-2">Planejamento Inteligente</h1>
          <p className="text-muted-foreground text-lg">Crie seu cronograma personalizado de estudos</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card-soft p-6 animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Adicionar disciplina</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Nome da disciplina</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Matemática"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Prazo/Data da prova</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label>Nível de dificuldade percebido</Label>
                <RadioGroup value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
                  <div className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="facil" id="facil" />
                    <Label htmlFor="facil" className="cursor-pointer flex-1">😊 Fácil</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="medio" id="medio" />
                    <Label htmlFor="medio" className="cursor-pointer flex-1">🤔 Médio</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="dificil" id="dificil" />
                    <Label htmlFor="dificil" className="cursor-pointer flex-1">😰 Difícil</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full rounded-xl py-6 bg-primary hover:bg-primary-dark">
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar cronograma
              </Button>
            </form>
          </div>

          {/* Preview */}
          <div className="card-soft p-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-secondary/10">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-2xl font-semibold">Seu cronograma desta semana</h2>
            </div>

            <div className="space-y-3">
              {suggestedSchedule.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary">{item.day}</span>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.topic}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm text-center">
                💡 Ajuste seu cronograma conforme sua rotina e preferências
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Planejamento;
