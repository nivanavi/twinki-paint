import styled  from "styled-components";
import {blue7} from "../globalStyledComponents";

export const StyledNotificationWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
`;

export const StyledNotificationItem = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  background: ${blue7};
  > svg {
    width: 3rem;
    height: 3rem;
    max-width: 3rem;
    max-height: 3rem;
  }
  > p {
    margin-left: 1.5rem;
    white-space: nowrap;
  }
`;