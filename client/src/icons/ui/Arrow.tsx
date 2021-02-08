import React from 'react';

export const ArrowIcon = ({direction}: { direction: "top" | "down" | "left" | "right" }) => {
  let deg: number = 0;

  switch (direction) {
    case "left":
      deg = -90;
      break;
    case "right":
      deg = 90;
      break;
    case "top":
      break;
    case "down":
      deg = 180;
      break;
  }
  return (
    <div style={{transform: `rotate(${deg}deg)`}}>
      <svg width="1rem" height="0.7rem" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6L5 2L9 6" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
  );
}
