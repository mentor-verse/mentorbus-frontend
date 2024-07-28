export function Fifth({ count, setCount }) {
  // Component logic and JSX
  const handleNext = () => {
    setCount(count + 1);
  };

  return (
    <div>
      {/* Component JSX */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
