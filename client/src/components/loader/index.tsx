import React          from "react";
import {StyledLoader} from "./styles";
import {LoaderIcon}   from "../../icons/ui/Loader";
import {Text2}        from "../globalStyledComponents";

export const Loader = ({type, loaderWidth}: { type?: "simple", loaderWidth?: number }) => {
  return (
    <StyledLoader width={loaderWidth}>
      <LoaderIcon/>
      {type !== "simple" && <Text2>Идет загрузка результатов...</Text2>}
    </StyledLoader>
  )
};
