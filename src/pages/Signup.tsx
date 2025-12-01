import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, User, Mail, Lock, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState<'medio' | 'superior'>('medio');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signup(name, email, password, educationLevel)) {
      toast.success('Conta criada com sucesso! Bem-vindo(a)!');
      navigate('/dashboard');
    } else {
      toast.error('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="card-soft p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-calm mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Criar sua conta</h1>
            <p className="text-muted-foreground">Comece a organizar seus estudos hoje</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Maria Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Nível de escolaridade
              </Label>
              <RadioGroup value={educationLevel} onValueChange={(value) => setEducationLevel(value as 'medio' | 'superior')}>
                <div className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="medio" id="medio" />
                  <Label htmlFor="medio" className="cursor-pointer flex-1">Ensino Médio</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="superior" id="superior" />
                  <Label htmlFor="superior" className="cursor-pointer flex-1">Ensino Superior</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full rounded-xl py-6 bg-primary hover:bg-primary-dark">
              Criar conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
