import React from "react";

type PROPS = {
  buttonText: string;
};

const Button: React.FC<PROPS> = (props) => {
  return (
    <button className="border w-36 rounded-md font-bold h-10 shadow  text-white">
      {props.buttonText}
    </button>
  );
};

export default Button;
