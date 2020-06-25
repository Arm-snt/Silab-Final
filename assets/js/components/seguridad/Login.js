import React, { Component } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 5,
    backgroundColor: "red"
  },
  form: {
    width: "100%",
    marginTop: 8
  },
  submit: {
    marginTop: 15,
    marginBottom: 20
  }
};

class Login extends Component {
  state = {
    usuario: {
      email: "",
      password: ""
    }
  };

  onChange = e => {
    let usuario = Object.assign({}, this.state.usuario);
    usuario[e.target.name] = e.target.value;
    this.setState({
      usuario: usuario
    });
  };

  login = e => {
    e.preventDefault();
    console.log("imprimir objeto usuario del state", this.state.usuario);
  };

  render() {
    return (
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutLineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              fullWidth
              label="E-mail"
              name="email"
              margin="normal"
              value={this.state.usuario.email}
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              name="password"
              margin="normal"
              value={this.state.usuario.password}
              onChange={this.onChange}
            />
            <Button
              type="submit"
              variant="contained"
              style={style.submit}
              fullWidth
              color="primary"
              onClick={this.login}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default Login;
