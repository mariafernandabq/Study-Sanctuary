import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PromptTemplate {
  category: string;
  title: string;
  prompt: string;
  icon: string;
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    category: 'Aprendizado',
    title: 'Explicação simplificada',
    prompt: 'Me ajude a entender esse tema: [insira o tema aqui] como se eu tivesse 15 anos. Use exemplos do dia a dia.',
    icon: '🎯',
  },
  {
    category: 'Resumos',
    title: 'Resumo para prova',
    prompt: 'Crie um resumo rápido e objetivo para minha prova de [disciplina] sobre o tema [tema]. Destaque os pontos mais importantes.',
    icon: '📝',
  },
  {
    category: 'Planejamento',
    title: 'Plano de estudos semanal',
    prompt: 'Sugira um plano de estudos para minha semana com foco em [tema/disciplina]. Considere que tenho [X] horas disponíveis por dia.',
    icon: '📅',
  },
  {
    category: 'Exercícios',
    title: 'Questões de múltipla escolha',
    prompt: 'Me dê 5 perguntas de múltipla escolha (com 4 alternativas cada) sobre [assunto]. Inclua as respostas corretas no final.',
    icon: '❓',
  },
  {
    category: 'Criatividade',
    title: 'Roteiro de podcast',
    prompt: 'Explique esse conteúdo [tema/conceito] como se fosse um roteiro de podcast descontraído de 5 minutos. Use linguagem casual.',
    icon: '🎙️',
  },
  {
    category: 'Revisão',
    title: 'Flashcards de revisão',
    prompt: 'Transforme minhas anotações sobre [tema] em 10 flashcards no formato: pergunta na frente, resposta atrás.',
    icon: '🗂️',
  },
  {
    category: 'Mapas Mentais',
    title: 'Estrutura de mapa mental',
    prompt: 'Crie um mapa mental sobre [conceito/tema] organizando os principais tópicos, subtópicos e conexões entre eles.',
    icon: '🧠',
  },
  {
    category: 'Redação',
    title: 'Estrutura de redação',
    prompt: 'Me ajude a estruturar uma redação sobre [tema]. Sugira: tese, argumentos principais e exemplos que posso usar.',
    icon: '✍️',
  },
  {
    category: 'Memorização',
    title: 'Técnica de memorização',
    prompt: 'Crie uma história ou mnemônico criativo para me ajudar a memorizar [lista de itens/conceitos/datas].',
    icon: '💭',
  },
  {
    category: 'Análise',
    title: 'Análise de texto',
    prompt: 'Analise esse texto [cole o texto] e identifique: tema principal, argumentos do autor, e possíveis pontos de crítica.',
    icon: '🔍',
  },
  {
    category: 'Matemática',
    title: 'Passo a passo matemático',
    prompt: 'Resolva esse exercício de [área da matemática] passo a passo, explicando cada etapa: [cole o exercício]',
    icon: '🔢',
  },
  {
    category: 'Idiomas',
    title: 'Prática de conversação',
    prompt: 'Vamos praticar [idioma]. Me faça perguntas simples sobre [tema] e corrija meus erros gramaticais.',
    icon: '🗣️',
  },
];

const Prompts = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    toast.success('Prompt copiado!', {
      description: 'Cole no ChatGPT, Gemini ou outra IA',
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const categories = [...new Set(PROMPT_TEMPLATES.map((p) => p.category))];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-calm">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Prompts de IA</h1>
              <p className="text-muted-foreground text-lg">Templates prontos para turbinar seus estudos</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="card-soft p-6 bg-gradient-to-br from-primary-light to-primary animate-in fade-in slide-in-from-bottom-6 duration-500 delay-150">
          <h3 className="text-xl font-semibold mb-3 text-primary-foreground">💡 O que é um prompt?</h3>
          <p className="text-primary-foreground/90 mb-4">
            Um prompt é uma instrução que você dá para uma inteligência artificial (como ChatGPT, Gemini, Claude) 
            para obter respostas específicas e úteis. Quanto mais claro e detalhado o prompt, melhor será o resultado!
          </p>
          <p className="text-primary-foreground/90 text-sm">
            <strong>Como usar:</strong> Escolha um template abaixo, personalize com seu tema específico, copie e cole 
            na sua IA favorita. Simples assim! ✨
          </p>
        </div>

        {/* Prompts by Category */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">▸</span>
                {category}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {PROMPT_TEMPLATES.filter((p) => p.category === category).map((template, index) => {
                  const globalIndex = PROMPT_TEMPLATES.indexOf(template);
                  return (
                    <div key={index} className="card-soft card-hover p-6 group">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{template.icon}</div>
                        <div className="flex-1 space-y-3">
                          <h3 className="font-semibold text-lg">{template.title}</h3>
                          <div className="p-4 bg-muted/50 rounded-xl border border-border text-sm font-mono">
                            {template.prompt}
                          </div>
                          <Button
                            onClick={() => handleCopy(template.prompt, globalIndex)}
                            className="w-full rounded-xl bg-primary hover:bg-primary-dark group-hover:shadow-hover transition-all"
                          >
                            {copiedIndex === globalIndex ? (
                              <>
                                <CheckCheck className="w-4 h-4 mr-2" />
                                Copiado!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copiar prompt
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="card-soft p-6 animate-in fade-in slide-in-from-bottom-10 duration-500 delay-500">
          <h3 className="text-xl font-semibold mb-4">🎓 Dicas para melhores resultados</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Seja específico: quanto mais detalhes você der, melhor será a resposta</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Personalize: substitua os [colchetes] com seu tema ou disciplina específica</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Itere: se a resposta não foi ideal, refine o prompt e tente novamente</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Combine: use múltiplos prompts em sequência para aprofundar o tema</span>
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};

export default Prompts;
