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
    { text: 'I feel comfortable and at ease when I\'m at home.', dimension: 'comfort' },
    { text: 'I feel energized and active in my home environment.', dimension: 'energy' },
    { text: 'I feel safe and relaxed at home.', dimension: 'comfort' },
    { text: 'I feel motivated to do things when I\'m at home.', dimension: 'energy' },
  ],
  school: [
    { text: 'I feel comfortable and accepted at school.', dimension: 'comfort' },
    { text: 'I feel energized and engaged during school.', dimension: 'energy' },
    { text: 'I feel calm and steady when I\'m at school.', dimension: 'comfort' },
    { text: 'I feel enthusiastic about things happening at school.', dimension: 'energy' },
  ],
  social: [
    { text: 'I feel comfortable when I\'m around other people.', dimension: 'comfort' },
    { text: 'I feel energized by social interactions.', dimension: 'energy' },
    { text: 'I feel relaxed and at ease in social settings.', dimension: 'comfort' },
    { text: 'I feel lively and active when I\'m with friends.', dimension: 'energy' },
  ],
  alone: [
    { text: 'I feel comfortable when I\'m by myself.', dimension: 'comfort' },
    { text: 'I feel energized during my alone time.', dimension: 'energy' },
    { text: 'I feel peaceful and calm when I\'m alone.', dimension: 'comfort' },
    { text: 'I feel motivated to do things on my own.', dimension: 'energy' },
  ],
};

export const SCALE_LABELS = {
  comfort: [
    'Very Uncomfortable',
    'Uncomfortable',
    'Neutral',
    'Comfortable',
    'Very Comfortable',
  ],
  energy: [
    'Very Drained',
    'Drained',
    'Neutral',
    'Energized',
    'Very Energized',
  ],
};

export const LIKERT_LABELS = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export function createEmptyAnswers() {
  return {
    home: [null, null, null, null],
    school: [null, null, null, null],
    social: [null, null, null, null],
    alone: [null, null, null, null],
  };
}
