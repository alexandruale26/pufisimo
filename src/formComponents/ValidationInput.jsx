import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Checkmark from "./variousComponents/Checkmark";
import VisibilityButton from "./variousComponents/VisibilityButton";
import { useController } from "../formBase/ControllerContext";

const ValidationInput = forwardRef(({ className, type, ...props }, ref) => {
  const passwordType = type === "password";

  const [visible, setVisible] = useState(passwordType);
  const { fieldState } = useController();
  const { isValid } = fieldState ? fieldState : { isValid: false };

  const onHandleClick = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <div className="h-9 w-full relative">
      <input
        type={visible ? "password" : "text"}
        className={twMerge(
          `w-full h-full rounded-md border border-grey-300 bg-white pl-3 pr-9 text-sm font-light transition-colors placeholder:text-grey-500 placeholder:font-light focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 disabled:bg-grey-100 disabled:cursor-not-allowed placeholder:select-none`,
          className
        )}
        ref={ref}
        {...props}
      />
      {isValid && !passwordType && <Checkmark />}
      {passwordType && <VisibilityButton name="show input values" visible={visible} onClick={onHandleClick} />}
    </div>
  );
});
ValidationInput.displayName = "ValidationInput";

export default ValidationInput;
