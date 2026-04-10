import { CONTEXTS, QUESTIONS, QUADRANTS } from '../constants/design';

/**
 * Scoring logic for Tel-UrMood.
 *
 * Each context has 8 questions. Each question has:
 *   dimension: 'comfort' | 'energy'
 *   polarity:  1 (positive) | -1 (negative / reverse-scored)
 *
 * Likert values are 0-4 (Strongly Disagree → Strongly Agree).
 * Positive items:  (value - 2) / 2   → 0→-1, 2→0, 4→+1
 * Negative items:  (2 - value) / 2   → 0→+1, 2→0, 4→-1  (reversed)
 *
 * The 4 values per dimension are averaged to produce one coordinate.
 * Quadrant is determined by the sign of each coordinate.
 */

function likertToCoord(value, polarity) {
  return polarity === 1 ? (value - 2) / 2 : (2 - value) / 2;
}

function getQuadrantKey(comfort, energy) {
  if (comfort >= 0 && energy >= 0) return 'energeticPleasant';
  if (comfort >= 0 && energy < 0) return 'calmPleasant';
  if (comfort < 0 && energy >= 0) return 'energeticUnpleasant';
  return 'lowUnpleasant';
}

/**
 * Compute result data from the raw answers object.
 * Returns an array of { key, label, icon, chartColor, comfort, energy, quadrantKey, quadrant }.
 */
export function computeResults(answers) {
  return CONTEXTS.map((ctx) => {
    const a = answers[ctx.key];
    const items = QUESTIONS[ctx.key];
    const comfortVals = [];
    const energyVals = [];

    items.forEach((item, i) => {
      const coord = likertToCoord(a[i], item.polarity);
      if (item.dimension === 'comfort') comfortVals.push(coord);
      else energyVals.push(coord);
    });

    const comfort = comfortVals.reduce((s, v) => s + v, 0) / comfortVals.length;
    const energy = energyVals.reduce((s, v) => s + v, 0) / energyVals.length;
    const quadrantKey = getQuadrantKey(comfort, energy);

    return {
      key: ctx.key,
      label: ctx.label,
      icon: ctx.icon,
      chartColor: ctx.chartColor,
      comfort: Math.round(comfort * 100) / 100,
      energy: Math.round(energy * 100) / 100,
      quadrantKey,
      quadrant: QUADRANTS[quadrantKey],
    };
  });
}

/**
 * Check whether all answers have been completed (no nulls).
 */
export function isComplete(answers) {
  return CONTEXTS.every((ctx) =>
    answers[ctx.key].every((v) => v !== null),
  );
}
