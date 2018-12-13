import _ from 'lodash';
import Chance from 'chance';

const chance = new Chance();
const dataLength = 50;

const number = max => Number(chance.floating({ fixed: 2, min: 0, max: max || 9999 }));

export const spendData = _.times(dataLength, () => number());
export const convertionData = _.times(dataLength, () => number(999));
