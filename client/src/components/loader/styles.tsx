import styled      from "styled-components";
import {lightBlue} from "../globalStyledComponents";

export const StyledLoader = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  p {
    opacity: 0.4;
    margin-top: 1rem;
  }
  > svg {
  ${({width}) => 
    typeof width === "number" ? 
      `
      min-width: ${width}rem;
      max-width: ${width}rem;
      min-height: ${width}rem;
      max-height: ${width}rem;
      `
      :
      ""
}
  
    color: ${lightBlue};
    animation: rotate 1s infinite linear;
  }
  @keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
`;