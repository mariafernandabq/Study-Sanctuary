import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  status: 'pendente' | 'em-andamento' | 'concluida';
  subtasks?: Subtask[];
  createdAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

export interface StudySession {
  id: string;
  date: string;
  subject: string;
  duration: number; // em minutos
  completed: boolean;
}

interface DataContextType {
  tasks: Task[];
  studySessions: StudySession[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  getWeeklyStats: () => { hoursStudied: number; tasksCompleted: number; sessionsCompleted: number; streak: number };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Trabalho de História: Revolução Industrial',
    subject: 'História',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'dificil',
    status: 'em-andamento',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 's1', title: 'Pesquisar fontes sobre o tema', deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
      { id: 's2', title: 'Escrever introdução', deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), completed: false },
      { id: 's3', title: 'Revisar e formatar trabalho', deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), completed: false },
    ],
  },
  {
    id: '2',
    title: 'Estudar para prova de Matemática',
    subject: 'Matemática',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'medio',
    status: 'pendente',
    createdAt: new Date().toISOString(),
    subtasks: [
      { id: 's4', title: 'Revisar funções trigonométricas', deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), completed: false },
      { id: 's5', title: 'Resolver exercícios do capítulo 5', deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), completed: false },
    ],
  },
  {
    id: '3',
    title: 'Leitura de Biologia: Fotossíntese',
    subject: 'Biologia',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'facil',
    status: 'concluida',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const MOCK_SESSIONS: StudySession[] = [
  { id: '1', date: new Date().toISOString(), subject: 'Matemática', duration: 45, completed: true },
  { id: '2', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), subject: 'História', duration: 60, completed: true },
  { id: '3', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), subject: 'Português', duration: 30, completed: true },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('agenda-tasks');
    const storedSessions = localStorage.getItem('agenda-sessions');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(MOCK_TASKS);
      localStorage.setItem('agenda-tasks', JSON.stringify(MOCK_TASKS));
    }

    if (storedSessions) {
      setStudySessions(JSON.parse(storedSessions));
    } else {
      setStudySessions(MOCK_SESSIONS);
      localStorage.setItem('agenda-sessions', JSON.stringify(MOCK_SESSIONS));
    }
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('agenda-tasks', JSON.stringify(updatedTasks));
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('agenda-tasks', JSON.stringify(updatedTasks));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks?.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
            ),
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('agenda-tasks', JSON.stringify(updatedTasks));
  };

  const addStudySession = (session: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedSessions = [...studySessions, newSession];
    setStudySessions(updatedSessions);
    localStorage.setItem('agenda-sessions', JSON.stringify(updatedSessions));
  };

  const getWeeklyStats = () => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentSessions = studySessions.filter((s) => new Date(s.date).getTime() > weekAgo);
    
    const hoursStudied = recentSessions.reduce((acc, s) => acc + s.duration, 0) / 60;
    const tasksCompleted = tasks.filter((t) => t.status === 'concluida').length;
    const sessionsCompleted = recentSessions.filter((s) => s.completed).length;

    // Calcular streak (dias consecutivos estudando)
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    while (true) {
      const dayStart = currentDate.getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      const hasStudied = studySessions.some((s) => {
        const sessionTime = new Date(s.date).getTime();
        return sessionTime >= dayStart && sessionTime < dayEnd && s.completed;
      });
      
      if (hasStudied) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
      
      if (streak > 30) break; // limite de segurança
    }

    return { hoursStudied, tasksCompleted, sessionsCompleted, streak };
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        studySessions,
        addTask,
        updateTaskStatus,
        toggleSubtask,
        addStudySession,
        getWeeklyStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
