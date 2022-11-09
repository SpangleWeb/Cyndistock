import React, { FC } from "react";

type props = {
  data: any;
};
export const TestComponent: FC<props> = ({ data }) => {
  console.log("hello there");
  console.log("what is the data", data);
  return <div>testComponent</div>;
};
