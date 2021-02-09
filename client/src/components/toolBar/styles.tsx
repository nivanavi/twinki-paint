import styled from "styled-components";

export const StyledToolBar = styled.div`
  .flagButton {
    margin-right: 1rem;
  }  
  .linkButton {
    margin-left: 2rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledToolBarWrapper = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 20px rgba(0, 61, 129, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2rem);
`;

export const StyledLogo = styled.div`
  > img {
    width: 12rem;
  }
`;

export const StyledInput = styled.input`
  border: unset;
  background: unset;
  padding: 0;
  margin: 0;
  font-size: 2.4rem;
  width: 2.4rem;
  height: 2.6rem;
`;

export const StyledLineWidth = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  > p {
    margin: 0 1rem 0.5rem 1rem;
  }
`;