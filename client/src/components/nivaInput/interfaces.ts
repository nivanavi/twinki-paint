import {MouseEvent, FocusEvent} from "react";

export interface TypesNivaInputProps {
  value?: string | undefined
  onChange?: (value: string) => void
  onClick?: (ev: MouseEvent<HTMLInputElement>) => void | undefined
  onFocus?: (ev: FocusEvent<HTMLInputElement>) => void | undefined
  onBlur?: (ev: FocusEvent<HTMLInputElement>) => void | undefined
  placeholder?: string | undefined
  type?: "text" | "number" | "password" | undefined
  errorMessage?: string | undefined
  successMessage?: string | undefined
  isStaticPlaceholder?: boolean | undefined
  height?: number
  isInvalid?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  iconBefore?: any
  iconAfter?: any
  mask?: string
  readOnly?: boolean
  debounce?: boolean
  debounceOffset?: number
  isControlled?: boolean
  isRequired?: boolean
}