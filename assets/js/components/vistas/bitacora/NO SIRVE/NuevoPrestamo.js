import React, { useState } from "react";
import {
  Paper,
  Divider,
  Grid,
  IconButton,
  Collapse,
  TextField,
  Button
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

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
    marginTop: 20,
    marginBottom: 20
  },
  error: {
    marginTop: 20,
    marginBottom: 20
  },
  grid: {
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: "5px"
  }
};

const NuevoPrestamo = ({ crearPrestamo }) => {
  //crear state de usuario
  const [prestamo, cambiarPrestamo] = useState({
    estudiante: "",
    usuario: "",
    asignatura: "",
    observacion: "",
    elemento: "",
    cantidad: "",
    stock: ""
  });

  //crear state de error
  const [error, actualizarError] = useState(false);

  //funcion para cuando el usuario escribe en los inputs
  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarPrestamo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Extraer los valores de los inputs
  const {
    estudiante,
    usuario,
    asignatura,
    observacion,
    elemento,
    cantidad,
    stock
  } = prestamo;

  //funcion para cuando el usuario envia la informacion
  const submitPrestamo = e => {
    e.preventDefault();

    //Validar
    if (
      estudiante === "" ||
      usuario === "" ||
      asignatura === "" ||
      observacion === "" ||
      elemento === "" ||
      cantidad === "" ||
      stock === ""
    ) {
      actualizarError(true);
      return;
    }

    //Eliminar el msj previo
    actualizarError(false);

    //Asignar Id
    prestamo.id = uuidv4();
    console.log(prestamo);

    //Crear prestamo
    crearPrestamo(prestamo);

    //Reiniciar el form
    cambiarPrestamo({
      estudiante: "",
      usuario: "",
      asignatura: "",
      observacion: "",
      elemento: "",
      cantidad: "",
      stock: ""
    });
  };

  function historyBack() {
    window.history.back();
  }

  const asig = [
    { state: "Robótica" },
    { state: "Fisica" },
    { state: "Química" }
  ];
  const est = [{ state: "191158 - Aldemar" }, { state: "191161 - Armando" }];
  const element = [
    { state: "455895 - Resistencia 2k" },
    { state: "859565 - Computador Dell" },
    { state: "213654 - Impresora Epson" }
  ];

  return (
    <Paper style={style.paper}>
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

      <form style={style.form} onSubmit={submitPrestamo}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Autocomplete
              id="asignatura"
              name="asignatura"
              options={asig}
              onChange={(event, value, reason) => {
                let valor;
                if (value !== null) {
                  valor = value.state;
                } else {
                  valor = "";
                }
                cambiarPrestamo(prev => ({
                  ...prev,
                  asignatura: valor
                }));
              }}
              getOptionLabel={option => option.state}
              renderInput={params => (
                <TextField {...params} label="Seleccione una asignatura" />
              )}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <Autocomplete
              id="estudiante"
              name="estudiante"
              options={est}
              onChange={(event, value) => {
                let valor;
                if (value !== null) {
                  valor = value.state;
                } else {
                  valor = "";
                }
                cambiarPrestamo(prev => ({
                  ...prev,
                  estudiante: valor
                }));
              }}
              getOptionLabel={option => option.state}
              renderInput={params => (
                <TextField {...params} label="Seleccione un estudiante" />
              )}
            />
          </Grid>
          <Grid item md={4} xs={6}>
            <TextField
              name="usuario"
              fullWidth
              label="Registrado por"
              value={usuario}
              onChange={cambiarDato}
            />
          </Grid>

          <Grid item md={4} xs={6}>
            <TextField
              name="observacion"
              multiline
              fullWidth
              label="Observaciones"
              value={observacion}
              onChange={cambiarDato}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={style.grid}>
          <Grid item md={12} xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6} md={4}>
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
                cambiarPrestamo(prev => ({
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
          <Grid item md={2} xs={3}>
            <TextField
              name="cantidad"
              fullWidth
              label="Cantidad"
              value={cantidad}
              onChange={cambiarDato}
            />
          </Grid>
          <Grid item md={2} xs={3}>
            <TextField
              name="stock"
              fullWidth
              label="Stock"
              value={stock}
              onChange={cambiarDato}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              color="primary"
              style={style.submit}
            >
              Agregar
            </Button>
          </Grid>
          <Grid item xs={2} md={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              color="secondary"
              style={style.submit}
              onClick={historyBack}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item md={12} xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

NuevoPrestamo.propTypes = {
  crearPrestamo: PropTypes.func.isRequired
};

export default NuevoPrestamo;
