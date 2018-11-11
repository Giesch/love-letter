import { Reducer } from 'redux'
import { HelloState, HelloActionTypes } from './types';

const initialState: HelloState = {
  compiler: "Typescript/Rust",
  framework: "React/Actix",
  counter: 0
};

const reducer: Reducer<HelloState> = (state = initialState, action) => {
  switch (action.type) {
    case HelloActionTypes.INCREMENT: {
      return { ...state, counter: state.counter + 1 }
    }
    case HelloActionTypes.DECREMENT: {
      return { ...state, counter: state.counter - 1 }
    }
    default: {
      return state;
    }
  }
}


export { reducer as helloReducer };
