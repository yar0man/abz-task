import React from "react";
import "./TextField.scss";
import classNames from "classnames";

type Props = {
  type: string;
  name: string;
  label: string;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRed?: boolean;
};

const TextField = ({
  type,
  name,
  label,
  value,
  changeHandler,
  isRed,
}: Props) => {
  return (
    <input
      className={classNames("textField", {
        "textField--red": isRed,
      })}
      type={type}
      name={name}
      placeholder={label}
      id={name}
      value={value}
      onChange={changeHandler}
    />
  );
};

export default TextField;