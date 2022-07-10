function RoutesComponent() {
  return (
    <Routes>
      {(c) => {
        {
          const Component = c;
          return <Component />;
        }
      }}
    </Routes>
  );
}