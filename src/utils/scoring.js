import { CONTEXTS, QUADRANTS } from '../constants/design';

/**
 * Scoring logic for Tel-UrMood.
 *
 * Each context has 4 questions (indices 0-3):
 *   Q0, Q2 → Comfort axis (X)
 *   Q1, Q3 → Energy axis  (Y)
 *
 * Likert values are 0-4 (Strongly Disagree → Strongly Agree).
 * Each value is normalised to [-1, +1]:  (value - 2) / 2
 * The two normalised values per axis are averaged to produce one coordinate.
 *
 * Quadrant is determined by the sign of each coordinate.
 */

const COMFORT_INDICES = [0, 2];
const ENERGY_INDICES = [1, 3];

function likertToCoord(value) {
  return (value - 2) / 2; // 0→-1, 1→-0.5, 2→0, 3→0.5, 4→1
}

function averageCoords(answerArray, indices) {
  const values = indices.map((i) => likertToCoord(answerArray[i]));
  return values.reduce((sum, v) => sum + v, 0) / values.length;
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
    const comfort = averageCoords(a, COMFORT_INDICES);
    const energy = averageCoords(a, ENERGY_INDICES);
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
