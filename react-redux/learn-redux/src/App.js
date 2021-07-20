import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './Actions';

 function App(){
  const counter = useSelector(state => state.counter);
  const logged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
 
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment(5))}>Increase</button>
      <button onClick={() => dispatch(decrement(5))}>Decrease</button>
      {logged ? <h3>You are logged in.</h3> : ''}
    </div>
  );
}

export default App;
