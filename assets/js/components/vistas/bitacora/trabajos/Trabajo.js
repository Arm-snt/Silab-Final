import React, { Fragment } from "react";
import TodoContextProvider from "./TodoContext";
import TodoTable from "./TodoTable";
import { CssBaseline } from "@material-ui/core";

export default function Trabajo() {
  return (
    <Fragment>
      <TodoContextProvider>
        <CssBaseline>
          <TodoTable />
        </CssBaseline>
      </TodoContextProvider>
    </Fragment>
  );
}
