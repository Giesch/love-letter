export interface HelloState {
  counter: number;
  compiler: string;
  framework: string;
}

export const enum HelloActionTypes {
  INCREMENT = 'hello/INCREMENT',
  DECREMENT = 'hello/DECREMENT',
}
