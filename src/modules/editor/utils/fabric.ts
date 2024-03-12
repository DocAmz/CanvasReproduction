import NP from '@/lib/number-precision';


export const PiBy180 = Math.PI / 180;


/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} v - The number to round.
 * @param {number} [digits=2] - The number of decimal places to round to. Default is 2.
 * @returns {number} - The rounded number.
 */
export const toFixed = (v: number, digits = 2): number => NP.round(v, digits);
