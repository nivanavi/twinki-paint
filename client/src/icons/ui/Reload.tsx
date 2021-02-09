import React from 'react';

export const ReloadIcon = ({direction}: { direction: "left" | "right" }) => {
  console.log("ddd", direction)
  return (
    <div style={{transform: `scaleX(${direction === "left" ? 1 : -1})`}}>
    <svg width="2rem" height="2.2rem" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 12.2195C19 17.0688 14.9706 21 10 21C5.02944 21 1 17.0688 1 12.2195C1 7.37018 5.02944 3.43902 10 3.43902C12.4153 3.43902 14.6084 4.36727 16.225 5.87805M16.225 5.87805L15 1M16.225 5.87805L11.5 7.34146"
        stroke="currentColor" strokeWidth="1.5"/>
    </svg>
    </div>
  );
}
