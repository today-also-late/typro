import React from "react";

type PROPS = {
  labelText: string;
};

const Label: React.FC<PROPS> = (props) => {
  return (
    <label className="text-uma-text1 font-bold block text-sm text-white">
      {props.labelText}
    </label>
  );
};

export default Label;
