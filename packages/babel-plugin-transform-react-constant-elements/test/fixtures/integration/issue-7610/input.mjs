import Parent from './Parent';
import Child from './Child';

function MyComponent({closeFn}) {
  return (
    <Parent render={() => <Child closeFn={closeFn} /> } />
  );
}

export default Parent;
