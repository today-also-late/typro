import React, { Component, useState, useEffect } from "react";
import { init } from "ityped";

const Hello = () => {
  useEffect(() => {
    const myElement: any = document.querySelector("#myElement");
    init(myElement, {
      showCursor: false,
      strings: ["Welcome to TyPro", "Yeah!"],
    });
  }, []);

  return <div id="myElement" className="text-4xl font-mono"></div>;
};

export default Hello;
