import { Home, GraduationCap, Users, User } from 'lucide-react';

export const CONTEXTS = [
  {
    key: 'home',
    label: 'Home',
    description: 'How you feel in your home environment — your everyday space.',
    icon: Home,
    chartColor: '#4a90d9',
  },
  {
    key: 'school',
    label: 'School',
    description: 'How you feel during school — classes, campus, that whole world.',
    icon: GraduationCap,
    chartColor: '#d94a5c',
  },
  {
    key: 'social',
    label: 'Social Activities',
    description: 'How you feel when you\'re with friends or in social settings.',
    icon: Users,
    chartColor: '#4ab87a',
  },
  {
    key: 'alone',
    label: 'Alone',
    description: 'How you feel when it\'s just you — your own time and space.',
    icon: User,
    chartColor: '#d9b84a',
  },
];

export const QUADRANTS = {
  energeticPleasant: { label: 'Energetic Pleasant', description: 'energized and comfortable' },
  calmPleasant: { label: 'Calm Pleasant', description: 'calm and at ease' },
  energeticUnpleasant: { label: 'Energetic Unpleasant', description: 'restless or on edge' },
  lowUnpleasant: { label: 'Low Unpleasant', description: 'drained or uneasy' },
};

export const STEPS = [
  { label: 'Answer', description: 'Respond to a few simple statements about each area of your life.' },
  { label: 'Map', description: 'Your answers are plotted onto a personal mood map.' },
  { label: 'Reflect', description: 'See your patterns and take a moment to understand yourself better.' },
];

export const CONTEXT_INSTRUCTIONS = {
  home: 'Think about how you usually feel when you\'re at home.',
  school: 'Think about how you usually feel when you\'re at school.',
  social: 'Think about how you usually feel when you\'re with friends or in social settings.',
  alone: 'Think about how you usually feel when you\'re by yourself.',
};

export const QUESTIONS = {
  home: [
    { dimension: 'comfort', polarity: 1 },   // 1 – Valence (+)
    { dimension: 'comfort', polarity: 1 },   // 2 – Valence (+)
    { dimension: 'comfort', polarity: -1 },  // 3 – Valence (−)
    { dimension: 'comfort', polarity: -1 },  // 4 – Valence (−)
    { dimension: 'energy',  polarity: 1 },   // 5 – Arousal (+)
    { dimension: 'energy',  polarity: 1 },   // 6 – Arousal (+)
    { dimension: 'energy',  polarity: -1 },  // 7 – Arousal (−)
    { dimension: 'energy',  polarity: -1 },  // 8 – Arousal (−)
  ],
  school: [
    { dimension: 'comfort', polarity: 1 },   // 9
    { dimension: 'comfort', polarity: 1 },   // 10
    { dimension: 'comfort', polarity: -1 },  // 11
    { dimension: 'comfort', polarity: -1 },  // 12
    { dimension: 'energy',  polarity: 1 },   // 13
    { dimension: 'energy',  polarity: 1 },   // 14
    { dimension: 'energy',  polarity: -1 },  // 15
    { dimension: 'energy',  polarity: -1 },  // 16
  ],
  social: [
    { dimension: 'comfort', polarity: 1 },   // 17
    { dimension: 'comfort', polarity: 1 },   // 18
    { dimension: 'comfort', polarity: -1 },  // 19
    { dimension: 'comfort', polarity: -1 },  // 20
    { dimension: 'energy',  polarity: 1 },   // 21
    { dimension: 'energy',  polarity: 1 },   // 22
    { dimension: 'energy',  polarity: -1 },  // 23
    { dimension: 'energy',  polarity: -1 },  // 24
  ],
  alone: [
    { dimension: 'comfort', polarity: 1 },   // 25
    { dimension: 'comfort', polarity: 1 },   // 26
    { dimension: 'comfort', polarity: -1 },  // 27
    { dimension: 'comfort', polarity: -1 },  // 28
    { dimension: 'energy',  polarity: 1 },   // 29
    { dimension: 'energy',  polarity: 1 },   // 30
    { dimension: 'energy',  polarity: -1 },  // 31
    { dimension: 'energy',  polarity: -1 },  // 32
  ],
};

export const SCALE_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export const LIKERT_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export function createEmptyAnswers() {
  return {
    home: [null, null, null, null, null, null, null, null],
    school: [null, null, null, null, null, null, null, null],
    social: [null, null, null, null, null, null, null, null],
    alone: [null, null, null, null, null, null, null, null],
  };
}
