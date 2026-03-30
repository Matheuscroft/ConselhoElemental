// ============================================
// CONSELHO ELEMENTAL - CONSTANTES
// ============================================

import type { Element, Area, ElementId } from '@/types';

import { AREAS_WITH_SUBAREAS } from './areas-with-subareas';

// ============================================
// ELEMENTOS
// ============================================

export const ELEMENTS: Record<ElementId, Element> = {
  terra: {
    id: 'terra',
    name: 'Terra',
    nameEn: 'Earth',
    icon: '🌿',
    color: '#3E5F44',
    glow: 'rgba(62, 95, 68, 0.4)',
    lightColor: '#4CAF50',
    domain: 'Corpo & Estrutura',
    description: 'Estabilidade, saúde, recursos e disciplina',
  },
  fogo: {
    id: 'fogo',
    name: 'Fogo',
    nameEn: 'Fire',
    icon: '🔥',
    color: '#D14900',
    glow: 'rgba(209, 73, 0, 0.5)',
    lightColor: '#FF6B35',
    domain: 'Ação & Projetos',
    description: 'Ambição, realização, criação e liderança',
  },
  agua: {
    id: 'agua',
    name: 'Água',
    nameEn: 'Water',
    icon: '🌊',
    color: '#1B4965',
    glow: 'rgba(27, 73, 101, 0.4)',
    lightColor: '#48CAE4',
    domain: 'Conexões & Emoções',
    description: 'Relacionamentos, espiritualidade e autoconhecimento',
  },
  ar: {
    id: 'ar',
    name: 'Ar',
    nameEn: 'Air',
    icon: '💨',
    color: '#A8DADC',
    glow: 'rgba(168, 218, 220, 0.3)',
    lightColor: '#E0F7FA',
    domain: 'Mente & Conhecimento',
    description: 'Intelecto, aprendizado, comunicação e estratégia',
  },
};

// ============================================
// ÁREAS POR ELEMENTO
export const AREAS: Area[] = AREAS_WITH_SUBAREAS.filter((area) => area.id !== 'sem-categoria');
// ============================================


// ============================================
// MULTIPLICADORES DE ESFORÇO
// ============================================

export const EFFORT_MULTIPLIERS: Record<number, number> = {
  1: 1.0,   // Automático
  2: 1.2,   // Leve
  3: 1.5,   // Moderado
  4: 2.0,   // Forte
  5: 2.8,   // Muito alta
};

export const EFFORT_LABELS: Record<number, { label: string; description: string }> = {
  1: { label: 'Automático', description: 'Sem resistência, flui naturalmente' },
  2: { label: 'Leve', description: 'Pouca resistência, leve esforço' },
  3: { label: 'Moderado', description: 'Resistência média, esforço notável' },
  4: { label: 'Forte', description: 'Alta resistência, grande esforço' },
  5: { label: 'Muito Alta', description: 'Extrema resistência, esforço máximo' },
};

// ============================================
// PONTUAÇÃO PADRÃO
// ============================================

export const DEFAULT_SCORES = {
  RITUAL: {
    baseValue: 1,
    effortLevel: 2,
    plannedTimeMinutes: 30,
    points: 1.2, // 1 * 1.2 (esforço leve)
  },
  CICLO: {
    plannedTimeMinutes: 15,
    plannedPoints: 5,
  },
  SEM_CATEGORIA_BONUS: 1, // +1 ponto para itens sem categoria
};

// ============================================
// BÔNUS DE PRESENÇA
// ============================================

export function getPresenceBonus(minutes: number): number {
  if (minutes < 0.5) return 0.0;  // < 30s
  if (minutes < 1) return 0.1;    // 30s - 59s
  if (minutes < 2) return 0.3;    // 1-2 min
  return 0.5;                      // >= 2 min
}

// ============================================
// MULTIPLICADORES DE TEMPO
// ============================================

export function getTimeMultiplier(minutes: number): number {
  if (minutes < 3) return 1.0;
  if (minutes <= 5) return 1.2;
  if (minutes <= 10) return 1.5;
  if (minutes <= 20) return 2.0;
  if (minutes <= 40) return 2.6;
  if (minutes <= 60) return 3.2;
  if (minutes <= 90) return 3.8;
  return 4.5; // cap
}

// ============================================
// CÁLCULO DE PONTUAÇÃO COMPLETO
// ============================================

export function calculateTaskScore(
  baseValue: number,
  effortLevel: number,
  actualTimeMinutes: number,
  hasCategory: boolean = true
): number {
  const effortMultiplier = EFFORT_MULTIPLIERS[effortLevel] || 1.0;
  const presenceBonus = getPresenceBonus(actualTimeMinutes);
  const timeMultiplier = actualTimeMinutes >= 3 
    ? getTimeMultiplier(actualTimeMinutes) 
    : 1.0;
  
  let score = baseValue * (1 + presenceBonus) * effortMultiplier;
  
  if (actualTimeMinutes >= 3) {
    score *= timeMultiplier;
  }
  
  // Bônus sem categoria
  if (!hasCategory) {
    score += DEFAULT_SCORES.SEM_CATEGORIA_BONUS;
  }
  
  return Math.round(score * 100) / 100;
}

// ============================================
// FASES DA LUA
// ============================================

export function getMoonPhase(date: Date = new Date()): { name: string; icon: string } {
  // Cálculo por idade lunar com base em época conhecida de Lua Nova (UTC).
  const synodicMonth = 29.530588853;
  const knownNewMoonUtc = Date.UTC(2000, 0, 6, 18, 14, 0);
  const age = ((((date.getTime() - knownNewMoonUtc) / 86400000) % synodicMonth) + synodicMonth) % synodicMonth;

  if (age < 1.84566) return { name: 'Lua Nova', icon: '🌑' };
  if (age < 5.53699) return { name: 'Lua Crescente', icon: '🌒' };
  if (age < 9.22831) return { name: 'Quarto Crescente', icon: '🌓' };
  if (age < 12.91963) return { name: 'Lua Gibosa', icon: '🌔' };
  if (age < 16.61096) return { name: 'Lua Cheia', icon: '🌕' };
  if (age < 20.30228) return { name: 'Lua Minguante', icon: '🌖' };
  if (age < 23.99361) return { name: 'Quarto Minguante', icon: '🌗' };
  if (age < 27.68493) return { name: 'Lua Balsâmica', icon: '🌘' };
  return { name: 'Lua Nova', icon: '🌑' };
}

// ============================================
// ESTAÇÕES DO ANO (Hemisfério Sul)
// ============================================

export type Hemisphere = 'north' | 'south';

export function getHemisphereFromLatitude(latitude?: number | null): Hemisphere {
  if (typeof latitude !== 'number' || Number.isNaN(latitude)) return 'south';
  return latitude >= 0 ? 'north' : 'south';
}

export function getSeason(
  date: Date = new Date(),
  options?: { hemisphere?: Hemisphere; latitude?: number | null }
): { name: string; icon: string } {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  const hemisphere = options?.hemisphere ?? getHemisphereFromLatitude(options?.latitude);

  if (hemisphere === 'south') {
    // Hemisferio Sul por marcos astronomicos aproximados.
    // Verao: 21/12-19/03 | Outono: 20/03-20/06 | Inverno: 21/06-22/09 | Primavera: 23/09-20/12
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day <= 19)) {
      return { name: 'Verão', icon: '☀️' };
    }
    if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day <= 20)) {
      return { name: 'Outono', icon: '🍂' };
    }
    if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) {
      return { name: 'Inverno', icon: '❄️' };
    }
    return { name: 'Primavera', icon: '🌸' };
  }

  // Hemisferio Norte por marcos astronomicos aproximados.
  // Inverno: 21/12-19/03 | Primavera: 20/03-20/06 | Verao: 21/06-22/09 | Outono: 23/09-20/12
  if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day <= 19)) {
    return { name: 'Inverno', icon: '❄️' };
  }
  if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day <= 20)) {
    return { name: 'Primavera', icon: '🌸' };
  }
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) {
    return { name: 'Verão', icon: '☀️' };
  }
  return { name: 'Outono', icon: '🍂' };
}

// ============================================
// DIAS DA SEMANA
// ============================================

export const WEEKDAYS = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
];

export const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// ============================================
// NAVEGAÇÃO
// ============================================

export const NAV_ITEMS = [
  { icon: '🏠', label: 'Santuário', route: '/santuario' },
  { icon: '📜', label: 'Rituais', route: '/rituais' },
  { icon: '✨', label: 'Invocar', route: '/invocar', isAction: true },
  { icon: '🔮', label: 'Astrolábio', route: '/astrolabio' },
  { icon: '📖', label: 'Grimório', route: '/grimorio' },
];

// ============================================
// AVATARES
// ============================================

export const AVATARS = [
  '🧙‍♂️', '🧙‍♀️', '🔮', '⚡', '🌟', '✨', '🌙', '☀️',
  '🐉', '🦅', '🦁', '🐺', '🦉', '🦋', '🌹', '⚔️',
  '🛡️', '👑', '💎', '🗝️', '📜', '🏛️', '🌌', '💫',
];

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

export function getElementById(id: ElementId): Element {
  return ELEMENTS[id];
}

export function getAreaById(id: string): Area | undefined {
  const topLevelArea = AREAS.find(area => area.id === id);
  if (topLevelArea) return topLevelArea;

  for (const area of AREAS) {
    const subarea = area.subareas?.find(sub => sub.id === id);
    if (subarea) return subarea;
  }

  return undefined;
}

export function getAreasByElement(elementId: ElementId): Area[] {
  return AREAS.filter(area => area.elementId === elementId);
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds}s`;
  }
  if (minutes < 60) return `${Math.round(minutes)}min`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateFull(date: Date): string {
  const weekday = WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${weekday}, ${day} de ${month} de ${year}`;
}

// ============================================
// AGREGADORES
// ============================================

export function calculateAggregatedScore(children: { isCompleted: boolean; baseValue: number | null; effortLevel: number | null }[]): number {
  return children.reduce((total, child) => {
    if (child.isCompleted) {
      const baseValue = child.baseValue || 1;
      const effortMultiplier = EFFORT_MULTIPLIERS[child.effortLevel || 1];
      return total + Math.round(baseValue * effortMultiplier);
    }
    return total;
  }, 0);
}

// ============================================
// XP E NÍVEIS
// ============================================

export function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function calculateLevelUp(currentXP: number, currentLevel: number): { newLevel: number; remainingXP: number } {
  let xpNeeded = calculateXPForLevel(currentLevel);
  let level = currentLevel;
  let xp = currentXP;
  
  while (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = calculateXPForLevel(level);
  }
  
  return { newLevel: level, remainingXP: xp };
}

// Export types
export type { ElementId };
