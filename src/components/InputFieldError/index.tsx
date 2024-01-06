import React from "react";

type InputFieldErrorProps = {
  message: string;
};

const InputFieldError: React.FC<InputFieldErrorProps> = ({
  message,
}: InputFieldErrorProps) => {
  return <span className="text-sm font-medium text-red-500">{message}</span>;
};

export default InputFieldError;
