import React from 'react';

export const GroupToggleArrowIcon = ({direction}: { direction: "top" | "down" | "left" | "right" }) => {
  let deg: number = 0;

  switch (direction) {
    case "left":
      deg = -180;
      break;
    case "right":
      break;
    case "top":
      deg = -90;
      break;
    case "down":
      deg = 90;
      break;
  }
  return (
    <div style={{transform: `rotate(${deg}deg)`}}>
      <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.4643 3.46581L1.62831 0.629816C1.13151 0.13302 0.282066 0.484872 0.282066 1.18745L0.282066 6.85943C0.282066 7.562 1.13151 7.91385 1.62831 7.41706L4.4643 4.58107C4.77227 4.2731 4.77227 3.77378 4.4643 3.46581Z" fill="currentColor"/>
      </svg>
    </div>
  );
}