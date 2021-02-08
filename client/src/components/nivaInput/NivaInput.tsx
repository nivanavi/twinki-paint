import React                                            from "react";
import {TypesNivaInputProps}                            from "./interfaces";
import {SNivaInput, SNivaInputLabel, SNivaInputWrapper} from "./nivaInputStyles";
import {Loader}                                         from "../loader";

export const NivaInput = (props: TypesNivaInputProps) => {
  const {
    value,
    debounce,
    isDisabled,
    isRequired,
    isControlled,
    debounceOffset,
    isLoading,
    mask,
    readOnly,
    onChange,
    onClick,
    onFocus,
    onBlur,
    iconAfter,
    iconBefore,
    errorMessage,
    isInvalid,
    successMessage,
    height,
    placeholder,
    type,
    isStaticPlaceholder
  } = props;
  const inputRef: { current: any } = React.useRef(null);

  React.useEffect(() => {
    if (isControlled || !inputRef.current || typeof value !== "string") return;
    ((inputRef || {}).current || {}).value = value;
    // eslint-disable-next-line
  }, [value])

  const styledProps = {
    iconBefore: !!iconBefore,
    iconAfter: !!iconAfter,
    height: height ? height : 6,
    isInvalid: !!isInvalid,
    isDisabled: !!isDisabled || !!isLoading,
    placeholder: isStaticPlaceholder ? placeholder : " ",
  };

  const generalInputProps = {
    type,
    ref: inputRef,
    readOnly,
    disabled: !!isDisabled,
    onClick: onClick ? (ev) => onClick(ev) : undefined,
    onFocus: onFocus ? (ev) => onFocus(ev) : undefined,
    onBlur: onBlur ? (ev) => onBlur(ev) : undefined,
    onChange: ({target: {value}}) => inputChangeHandler(value)
  }

  const inputProps = isControlled ? {
    value: value || "",
    ...generalInputProps
  } : {
    defaultValue: value || "",
    ...generalInputProps
  }

  let timeout;
  const onChangeDebounce = (value: string) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (onChange) onChange(value)
    }, debounceOffset || 300)
  };
  const inputChangeHandler = (value: string) => {
    if (isDisabled) return;
    if (onChange && debounce) return onChangeDebounce(value)
    if (onChange) return onChange(value)
    return undefined;
  }

  return (
    <>
      <SNivaInputWrapper className="nivaInput" isDisabled={!!isDisabled}>
        {iconBefore ? <span className="iconBefore">{iconBefore}</span> : null}
          <SNivaInput
            {...inputProps}
            {...styledProps}
          />
        {!isStaticPlaceholder &&
        <SNivaInputLabel isRequired={!!isRequired} iconBefore={!!iconBefore}>{placeholder}</SNivaInputLabel>}
        {isLoading ?
          <span className="iconAfter"><Loader type="simple" loaderWidth={2.5}/></span>
          :
          <>{!!iconAfter && <span className="iconAfter">{iconAfter}</span>}</>
        }
      </SNivaInputWrapper>
    </>
  )
}
;

export default NivaInput;