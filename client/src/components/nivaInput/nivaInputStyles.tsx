import styled                                      from 'styled-components';
import {black, grey, halfDarkGrey, lightBlue, red} from "../globalStyledComponents";

export const SNivaInputWrapper = styled.div<{isDisabled: boolean}>`
  ${({isDisabled}) => isDisabled ? "cursor: no-drop;" : ""}
  position: relative;
  overflow: hidden;
  > input:focus + label, > input:not(:placeholder-shown) + label {
    font-size: 1.2rem;
    line-height: 2rem;
    top: 0.8rem;  
  }
  .iconBefore {
    position: absolute;
    left: 1.5rem;
    top: 0;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .iconAfter {
    position: absolute;
    right: 1.5rem;
    top: 0;
    display: flex;
    height: 100%;
    align-items: center;
  }
`;
export const SNivaInput = styled.input<{height: number, isDisabled: boolean, isInvalid: boolean, iconBefore: boolean, iconAfter: boolean}>`
    box-sizing: border-box;
    font-size: 1.4rem;
    outline: none;
    ${({iconBefore, iconAfter}) => 
    `padding: 1.8rem ${iconAfter ? "4rem" : "1.5rem"} 0 ${iconBefore ? "4rem" : "1.5rem"};`
    }
    ${({height}) => 
    `height: ${height}rem;`
    } 
    width: 100%;
    color: ${black};
    ${({isInvalid}) =>
        isInvalid ?
          `
              border: 1px solid ${red};
          `
            :
          `
              border: 1px solid ${grey};
              :hover, :focus {
              border: 1px solid ${lightBlue}; 
    }
          `
    }   
     ${({isDisabled}) =>
        isDisabled ?
          `
              color: ${halfDarkGrey};
              pointer-events: none;
          `
            :
          `
          `
    }
`;

export const SNivaInputLabel = styled.label<{iconBefore: boolean, isRequired: boolean}>`
    position: absolute;
    white-space: nowrap;
    color: ${halfDarkGrey};
    ${({iconBefore}) =>
      `left: ${iconBefore ? "4rem" : "1.5rem"};`
    }
    font-size: 1.4rem;
    line-height: 2rem;
    font-family: Verdana;
    pointer-events: none;
    transition: all .2s ease;
    top: calc(50% - 0.9rem);
    
    ${({isRequired}) =>
      isRequired ?
        `
        ::after {
          content: "*";
          color: ${red};
        }
        `
        :
        ""
    }
`;

