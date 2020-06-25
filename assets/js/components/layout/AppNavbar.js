import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/styles";
import { compose } from "recompose";
import BarSession from "./bar/BarSession";
//import AutoCompleteText from "../../AutoCompleteText";

const styles = theme => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class AppNavbar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <BarSession />
        </AppBar>
      </div>
    );
  }
}

export default compose(withStyles(styles))(AppNavbar);
