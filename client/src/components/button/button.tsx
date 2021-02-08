import React, {MouseEvent} from "react";
import {
  StyledButton,
  StyledFilledButton,
  StyledTransparentButton,
  StyledLinkButton,
  StyledTextButton,
  StyledIconButton,
  StyledFlagButton, StyledButtonLoading
}                          from "./styles";
import {LoaderIcon}        from "../../icons/ui/Loader";
import {TextButton, TextCaption}       from "../globalStyledComponents";

export type ButtonTypes = "filled" | "transparent" | "link" | "text" | "icon" | "flag";

interface ButtonProps {
  appearance: ButtonTypes
  type?: "submit" | "reset" | "button"
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void
  width?: "100%"
  height?: number
  isLoading?: boolean
  children?: any
  isDisabled?: boolean
  iconBefore?: any
  iconAfter?: any
  icon?: any
  form?: string
  tooltip?: string
  id?: string
}

export const Button = ({appearance, id, isLoading, onClick, tooltip, type, form, width, height, iconAfter, icon, iconBefore, children, isDisabled}: ButtonProps) => {
  const buttonChildren = (
    <>
      {iconBefore ? <span className="iconBefore">{iconBefore}</span> : null}
      <TextButton>{children}</TextButton>
      {iconAfter ? <span className="iconAfter">{iconAfter}</span> : null}
    </>
  );
  const loader = <StyledButtonLoading><LoaderIcon/></StyledButtonLoading>;
  const clickHandler = (ev: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return ev.preventDefault();
    if (!onClick) return undefined;
    return onClick(ev);
  }
  return (
    <StyledButton
      id={id}
      isLoading={!!isLoading}
      form={form}
      className={`${appearance}Button`}
      width={width ? width : "auto"}
      type={type}
      onClick={clickHandler}>
      {(() => {
        switch (appearance) {
          case "filled":
            return (
              <StyledFilledButton
                isDisabled={!!isDisabled}
                height={height ? height : 5}>
                {isLoading && loader}
                {buttonChildren}
              </StyledFilledButton>
            )
          case "transparent":
            return (
              <StyledTransparentButton
                isDisabled={!!isDisabled}
                height={height ? height : 5}>
                {isLoading && loader}
                {buttonChildren}
              </StyledTransparentButton>
            )
          case "link":
            return (
              <StyledLinkButton
                isDisabled={!!isDisabled}>
                {isLoading && loader}
                {buttonChildren}
              </StyledLinkButton>
            )
          case "text":
            return (
              <StyledTextButton
                isDisabled={!!isDisabled}>
                {isLoading && loader}
                {buttonChildren}
              </StyledTextButton>
            )
          case "icon":
            return (
              <StyledIconButton
                isDisabled={!!isDisabled}>
                {isLoading && loader}
                <span className="buttonIcon">{icon}</span>
              </StyledIconButton>
            )
          case "flag":
            return (
              <StyledFlagButton isDisabled={!!isDisabled}>
                {isLoading && loader}
                <span className="buttonIcon">{icon}</span>
              </StyledFlagButton>
            )
        }
      })()}
      {tooltip && <div className="buttonTooltip"><TextCaption>{tooltip}</TextCaption></div>}
    </StyledButton>
  )
};

export default Button;