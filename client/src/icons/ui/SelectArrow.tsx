import React from 'react';

export const SelectArrowIcon = ({direction}: { direction: "top" | "down" | "left" | "right" }) => {
  let deg: number = 0;

  switch (direction) {
    case "left":
      deg = -90;
      break;
    case "right":
      deg = 90;
      break;
    case "top":
      deg = 180;
      break;
    case "down":
      deg = 0;
      break;
  }
  return (
    <div style={{
      transition: "all 0.3s",
      transform: `rotate(${deg}deg)`,
      transformOrigin: "0.5rem 0.6rem"
    }}>
      <svg width="0.9rem" height="0.4rem" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L4.5 4L9 0L0 0Z" fill="currentColor"/>
      </svg>
    </div>
  );
}