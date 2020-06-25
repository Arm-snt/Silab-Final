import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Collapse,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
//Mantenimientosimport fotoUsuarioTemp from "../../../../logo.svg";
//Mantenimientosimport ImageUploader from "react-images-upload";
//Mantenimientosimport { v4 as uuidv4 } from "uuid";

const style = {
  container: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  },
  link: {
    display: "flex"
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px"
  },
  form: {
    width: "100%"
  },
  submit: {
    marginTop: 30,
    marginBottom: 20
  },
  foto: {
    height: "100px"
  },
  avatar: {
    margin: 25,
    backgroundColor: "#e53935"
  },
  error: {
    marginTop: 20,
    marginBottom: 20
  }
};

const NuevoMantenimiento = () => {
  //crear state de usuario
  const [perfil, cambiarPerfil] = useState({
    elemento: "",
    tipo: "",
    observacion: "",
    notificar: "",
    registro: ""
  });

  //crear state de error
  const [error, actualizarError] = useState(false);

  //funcion para cuando el usuario escribe en los inputs
  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarPerfil(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Extraer los valores de los inputs
  const { elemento, tipo, observacion, notificar, registro } = perfil;

  //funcion para cuando el usuario envia la informacion
  const submitPerfil = e => {
    e.preventDefault();
    if (
      elemento === "" ||
      tipo === "" ||
      observacion === "" ||
      notificar === "" ||
      registro === ""
    ) {
      actualizarError(true);
      return;
    }

    console.log(perfil);
    actualizarError(false);

    //Agregar Usuario o Actualizar

    //Reiniciar el form
    cambiarPerfil({
      elemento: "",
      tipo: "",
      observacion: "",
      notificar: "",
      registro: ""
    });
  };

  const element = [
    { state: "455895 - Resistencia 2k" },
    { state: "859565 - Computador Dell" },
    { state: "213654 - Impresora Epson" }
  ];
  const tipos = [
    { state: "Preventivo" },
    { state: "Correctivo" },
    { state: "Calibración" }
  ];

  return (
    <Container
      style={style.container}
      component="main"
      maxWidth="lg"
      justify="center"
    >
      <Paper style={style.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" style={style.link} href="/mantenimientos">
                <HomeIcon style={style.homeIcon} />
                Mantenimientos
              </Link>
              <Typography color="textPrimary">
                Registrar Mantenimiento
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Collapse in={error} style={style.error}>
          <Alert
            variant="filled"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => {
                  actualizarError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            ¡Tiene que llenar todos los campos!
          </Alert>
        </Collapse>

        <form style={style.form} onSubmit={submitPerfil}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Autocomplete
                id="elemento"
                name="elemento"
                options={element}
                onChange={(event, value) => {
                  let valor;
                  if (value !== null) {
                    valor = value.state;
                  } else {
                    valor = "";
                  }
                  cambiarPerfil(prev => ({
                    ...prev,
                    elemento: valor
                  }));
                }}
                getOptionLabel={option => option.state}
                renderInput={params => (
                  <TextField {...params} label="Seleccionar elemento" />
                )}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <Autocomplete
                id="tipo"
                name="tipo"
                options={tipos}
                onChange={(event, value) => {
                  let valor;
                  if (value !== null) {
                    valor = value.state;
                  } else {
                    valor = "";
                  }
                  cambiarPerfil(prev => ({
                    ...prev,
                    tipo: valor
                  }));
                }}
                getOptionLabel={option => option.state}
                renderInput={params => (
                  <TextField {...params} label="Tipo de Mantenimiento" />
                )}
              />
            </Grid>
            <Grid item md={5} xs={6}>
              <TextField
                name="observacion"
                fullWidth
                multiline
                label="Observaciones"
                value={observacion}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                name="notificar"
                fullWidth
                label="Notificar a"
                value={notificar}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <TextField
                name="registro"
                fullWidth
                label="Registrado por"
                value={registro}
                onChange={cambiarDato}
              />
            </Grid>

            <Grid container justify="center">
              <Grid item xs={6} md={4}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="medium"
                  color="primary"
                  style={style.submit}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default NuevoMantenimiento;
