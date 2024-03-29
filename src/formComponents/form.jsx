import React from "react";
import { twMerge } from "tailwind-merge";
import { Controller, useController } from "../formBase/ControllerContext";

const FormField = ({ ...props }) => {
  return <Controller {...props} />;
};

const FormItem = ({ className, children, ...props }) => {
  return (
    <div className={twMerge("w-full space-y-2", className)} {...props}>
      {children}
    </div>
  );
};
FormItem.displayName = "FormItem";

const FormLabel = ({ className, children, ...props }) => {
  const { name: id } = useController();

  return (
    <label htmlFor={id} className={twMerge("block w-full text-sm font-medium text-grey-800", className)} {...props}>
      {children}
    </label>
  );
};
FormLabel.displayName = "Label";

const FormMessage = ({ className, children, ...props }) => {
  const { fieldState } = useController();

  const errorMessage = fieldState?.errorMessage;
  const body = errorMessage ? errorMessage : children;

  if (!body) {
    return null;
  }

  return (
    <p className={twMerge("text-[0.8rem] font-normal text-red-500", className)} {...props}>
      {body}
    </p>
  );
};
FormMessage.displayName = "FormMessage";

export { FormField, FormItem, FormMessage, FormLabel };
