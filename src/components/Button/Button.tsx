import React from "react";
import "./Button.scss";

interface Props {
  width?: string;
  text: string;
  disabled?: boolean;
  href?: string;
  type?: "button" | "reset" | "submit";
  onSubmit?: (event: React.FormEvent) => void;
}

export const Button: React.FC<Props> = ({
  width = "100px",
  text,
  disabled = false,
  href = "",
  onSubmit,
  type
}) => {
  return (
    <a className="button_link" href={href}>
      <button
        className="button"
        disabled={disabled}
        style={{ width: width }}
        type={type}
        onClick={onSubmit}
      >
        {text}
      </button>
    </a>
  );
};
