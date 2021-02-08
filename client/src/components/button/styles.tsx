import styled                                                                   from 'styled-components';
import {
  black, black70,
  blue, blue7,
  blueClick, grey,
  halfDarkGrey,
  lightBlue,
  lightBlueClick,
  lightBlueHover,
  white
} from "../globalStyledComponents";

export const StyledButton = styled.button<{width: string, isLoading: boolean}>`
  position: relative;
  background: unset;
  margin: 0;
  padding: 0;
  border: unset;
  ${({width}) => `width: ${width};`}
  ${({isLoading}) =>
    isLoading ?
      `
      pointer-events: none;
       p, .iconBefore, .iconAfter, .buttonIcon {
        opacity: 0;
      }
      `
      :
      ""
  }
  
  > div {
  display: flex;
  align-items: center;
  white-space: nowrap;
  }
  
  .iconBefore {
    display: block;
    margin-right: 1.2rem;
  }  
  .iconAfter {
    display: block;
    margin-left: 1.2rem;
  }
  
  :hover .buttonTooltip {
    opacity: 1;
  } 
  .buttonTooltip {
    pointer-events: none;
    z-index: 5;
    opacity: 0;
    top: calc(100% + 0.5rem);
    position: absolute;
    padding: 2px 0.5rem;
    background: ${black};
    color: ${white};
    left: 50%;
    transform: translate(-50%);
    transition: opacity .3s;
    border-radius: 0.5rem;
  }
`;

export const StyledFilledButton = styled.div<{ height: number, isDisabled: boolean }>`
  justify-content: center;
  color: ${white};
  padding: 0 3.5rem;
  width: calc(100% - 7rem);
  transition: background 0.2s;
  ${({height}) =>
  `
  height: ${height}rem;
  `}
  
  ${({isDisabled}) =>
  isDisabled ?
    `
     background: ${grey};
     cursor: no-drop;
     `
    :
    `
      background: ${lightBlue};
 :hover {
  background: ${lightBlueHover};
 }
 :active {
  background: ${lightBlueClick};
  }
  :focus {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
     `
}  
`;
export const StyledTransparentButton = styled.div<{ height: number, isDisabled: boolean }>`
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  color: ${blue};
  padding: 0 3.5rem;
  // width: calc(100% - 7rem);
  transition: background 0.2s;  
  ${({height}) =>
  `
  height: ${height}rem;
  `}
  
  ${({isDisabled}) =>
  isDisabled ?
    `
     background: ${white};
     cursor: no-drop;
     color: ${grey};
     border: 1px solid ${grey};
     `
    :
    `
      background: ${white};
      border: 1px solid ${blue};
 :hover {
  background: ${blue};
  color: ${white};
 }
 :active {
  background: ${blueClick};
  border: 1px solid ${blueClick};
  color: ${white};
  }
  :focus {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
     `
} 
`;
export const StyledLinkButton = styled.div<{ isDisabled: boolean }>`
   transition: color 0.2s;
    > p {
    text-decoration: underline;
  }
  
    ${({isDisabled}) =>
  isDisabled ?
    `
     cursor: no-drop;
     color: ${grey};
     `
    :
    `
    color: ${blue};
 :hover {
  color: ${lightBlue};
 }
 :active {
  color: ${lightBlue};
  }
  cursor: pointer;
     `
}
`;
export const StyledTextButton = styled.div<{ isDisabled: boolean }>`
  transition: color 0.2s;
    ${({isDisabled}) =>
  isDisabled ?
    `
     cursor: no-drop;
     color: ${grey};
     `
    :
    `
    color: ${halfDarkGrey};
 :hover {
  color: ${black};
 }
 :active {
  color: ${black};
  }
  cursor: pointer;
     `
} 

`;

export const StyledIconButton = styled.div<{ isDisabled: boolean }>`
  transition: color 0.2s;
    ${({isDisabled}) =>
  isDisabled ?
    `
     cursor: no-drop;
     color: ${grey};
     `
    :
    `
    color: ${halfDarkGrey};
 :hover {
  color: ${black};
 }
 :active {
  color: ${black};
  }
  cursor: pointer;
     `
} 
`;
export const StyledFlagButton = styled.div<{ isDisabled: boolean; }>`
width: 3.6rem;
height: 3.6rem;
display: flex;
align-items: center;
justify-content: center;

${({isDisabled}) =>
  isDisabled ?
    `
     cursor: no-drop;
     color: ${grey};
     `
    :
    `
color: ${black70};
cursor: pointer;
transition: all 0.2s;
:hover {
  background: ${blue7};
  color: ${lightBlue};
}
     `
} 
`;

export const StyledButtonLoading = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
  > svg {
    height: 50%;
    animation: rotate 1s infinite linear;
  }

  @keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;