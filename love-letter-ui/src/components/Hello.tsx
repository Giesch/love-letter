import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../store/index';
import * as helloActions from '../store/hello/actions';

interface HelloProps {
  compiler: string;
  framework: string;
  counter: number;
  onIncrement: typeof helloActions.increment;
  onDecrement: typeof helloActions.decrement;
}

const Hello = (props: HelloProps) => (
  <div>
    <h1>
      Hello from {props.compiler} and {props.framework}!
    </h1>
    <h2>{props.counter}</h2>
    <button onClick={props.onIncrement}>+</button>
    <button onClick={props.onDecrement}>-</button>
  </div>
);

const mapStateToProps = ({ hello }: ApplicationState) => ({
  compiler: hello.compiler,
  framework: hello.framework,
  counter: hello.counter
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: () => dispatch(helloActions.increment()),
  onDecrement: () => dispatch(helloActions.decrement())
});

export const HelloContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);


