import { action } from 'typesafe-actions';
import { HelloActionTypes } from './types';

export const increment = () => action(HelloActionTypes.INCREMENT);
export const decrement = () => action(HelloActionTypes.DECREMENT);
