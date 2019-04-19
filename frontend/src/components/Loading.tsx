import React, { SFC } from "react";
import { Spinner } from "@blueprintjs/core";

const Loading: SFC = () => (
  <div className="loading">
    <Spinner intent="primary" />
  </div>
);

export default Loading;
