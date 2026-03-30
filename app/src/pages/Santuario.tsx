import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { ElementCard, TaskCard } from '@/components/cards';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const Santuario: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    getElementScores, 
    tasks, 
    habits,
    completeTask,
    startTimer,
  } = useAppStore();

  const elementScores = getElementScores();
  const pendingTasks = tasks.filter(t => !t.isCompleted).slice(0, 3);
  const completedToday = tasks.filter(t => {
    if (!t.isCompleted) return false;
    const today = new Date().toDateString();
    return t.updatedAt.toDateString() === today;
  }).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="text-center py-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            {user.avatar}
          </motion.div>
          <h2 className="font-mystic text-2xl mb-1">
            Bem-vindo, <span className="text-mystic-gold">{user.name}</span>
          </h2>
          <p className="text-white/50 text-sm">
            Nível {user.level} • {user.experience}/{user.experienceToNextLevel} XP
          </p>
          
          {/* XP Bar */}
          <div className="mt-3 mx-auto max-w-xs">
            <Progress 
              value={(user.experience / user.experienceToNextLevel) * 100} 
              className="h-2 bg-white/10"
            />
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-3"
        >
          <div className="glass-card p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-mystic-gold mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xl font-bold">{user.totalScore}</span>
            </div>
            <p className="text-[10px] text-white/50">Pontos Totais</p>
          </div>
          
          <div className="glass-card p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-white mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xl font-bold">{completedToday}</span>
            </div>
            <p className="text-[10px] text-white/50">Hoje</p>
          </div>
          
          <div className="glass-card p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xl font-bold">{user.streak}</span>
            </div>
            <p className="text-[10px] text-white/50">Streak</p>
          </div>
        </motion.div>

        {/* Elements Balance */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mystic text-lg">Equilíbrio Elemental</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/pilares')}
              className="text-mystic-gold"
            >
              Ver todos
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {elementScores.map((score) => (
              <ElementCard
                key={score.elementId}
                elementId={score.elementId}
                score={score.score}
                percentage={score.percentage}
                onClick={() => navigate('/pilares')}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h3 className="font-mystic text-lg mb-3">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/invocar')}
              className="h-auto py-4 bg-gradient-to-br from-mystic-arcane to-purple-600 
                        hover:from-mystic-arcane/90 hover:to-purple-600/90"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Invocar Ritual</p>
                <p className="text-xs text-white/60">Nova tarefa</p>
              </div>
            </Button>
            
            <Button
              onClick={() => navigate('/ciclos')}
              variant="outline"
              className="h-auto py-4 border-white/20 hover:bg-white/10"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Ver Ciclos</p>
                <p className="text-xs text-white/60">{habits.length} hábitos</p>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mystic text-lg">Rituais Pendentes</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/rituais')}
                className="text-mystic-gold"
              >
                Ver todos
              </Button>
            </div>
            
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  compact
                  onComplete={() => completeTask(task.id, undefined)}
                  onStart={() => startTimer(task.id, 'TASK')}
                  onClick={() => navigate('/rituais')}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {pendingTasks.length === 0 && (
          <motion.div 
            variants={itemVariants}
            className="glass-card p-6 text-center"
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-mystic text-lg mb-2">Tudo em ordem!</h3>
            <p className="text-white/50 text-sm mb-4">
              Você não tem rituais pendentes. Que tal invocar um novo?
            </p>
            <Button onClick={() => navigate('/invocar')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Invocar Ritual
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AppLayout>
  );
};
