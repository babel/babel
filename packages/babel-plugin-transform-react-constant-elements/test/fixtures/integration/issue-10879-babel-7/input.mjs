import React from 'react';

const namespace = {
  MyComponent: (props) => props.name
};

const buildTest = (name) => {
  const { MyComponent } = namespace;
  return () => (
    <MyComponent name={name} />
  );
}
