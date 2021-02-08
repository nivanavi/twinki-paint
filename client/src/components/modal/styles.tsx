import styled                                from "styled-components";
import {black, black40, halfDarkGrey, white} from "../globalStyledComponents";

export const StyledModalWrapper = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyledModalBackground = styled.div`
  background: ${black40};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledModal = styled.div<{width: number}>`
  background: ${white};
  padding: 3rem;
  position: relative;
  ${({width}) => 
    `
      width: ${width}rem; 
    `
  }
  
  > h2 {
    margin-bottom: 4rem;
  }
  
  @media screen and (max-width: 767px) {
    padding: 6rem 1.5rem 2rem 1.5rem;
    width: calc(100% - 3rem);
    min-height: calc(100vh - 8rem);
    overflow-y: auto;
    overflow-x: hidden;
    
    > h2 {
      margin-bottom: 2rem;
    }
  }
`;

export const StyledCloseButton = styled.div`
z-index: 15;
cursor: pointer;
position: absolute;
right: 3rem;
top: 2rem;
right: 2rem;
color: ${halfDarkGrey};
:hover {
  color: ${black};
}
svg {
  width: 1.7rem;
  height: 1.7rem;
}
  @media screen and (max-width: 767px) {
    top: 6rem;
  }
`;