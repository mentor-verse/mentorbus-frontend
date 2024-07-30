import React from 'react';

interface FifthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export function Fifth({ count, setCount }: FifthProps) {
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
