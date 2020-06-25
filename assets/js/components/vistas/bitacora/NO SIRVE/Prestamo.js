import React, { Fragment, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Container,
  Paper,
  IconButton,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";
import PropTypes from "prop-types";
import NuevoPrestamo from "./NuevoPrestamo";

const style = {
  table: {
    minWidth: 650
  },
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
  space: {
    paddingTop: "20px"
  },
  divider: {
    marginBottom: 20
  },
  search: {
    width: 400,
    marginBottom: 20
  },
  tableHead: {
    color: "#ffffff",
    backgroundColor: "#E2001A"
  },
  tableCell: {
    color: "#ffffff"
  }
};

function Prestamo() {
  //Préstamos en local storage
  let prestamosIniciales = JSON.parse(localStorage.getItem("prestamos"));
  if (!prestamosIniciales) {
    prestamosIniciales = [];
  }

  // Arreglo de prestamos
  const [prestamos, guardarPrestamos] = useState(prestamosIniciales);

  //Realizar operaciones cuando el state cambia
  useEffect(() => {
    let prestamosIniciales = JSON.parse(localStorage.getItem("prestamos"));
    if (prestamosIniciales) {
      localStorage.setItem("prestamos", JSON.stringify(prestamos));
    } else {
      localStorage.setItem("prestamos", JSON.stringify([]));
    }
  }, [prestamos]);

  // Funcion que tome los prestamos actuales y agregue los nuevos
  const crearPrestamo = prestamo => {
    guardarPrestamos([...prestamos, prestamo]);
  };

  //Función que elimina un prestamo por id
  const eliminarPrestamo = id => {
    const nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== id);
    guardarPrestamos(nuevosPrestamos);
  };

  //Mensaje condicional
  const titulo =
    prestamos.length === 0 ? "No hay préstamos" : "Administra tus préstamos";

  return (
    <Fragment>
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center"
      >
        <NuevoPrestamo crearPrestamo={crearPrestamo} />
        <Paper style={style.paper}>
          <Typography>{titulo} </Typography>
        </Paper>
        <TableContainer component={Paper} style={style.space}>
          <Table style={style.table} aria-label="customized table">
            <TableHead style={style.tableHead}>
              <TableRow>
                <TableCell style={style.tableCell} align="center">
                  Elemento
                </TableCell>
                <TableCell style={style.tableCell} align="center">
                  Cantidad
                </TableCell>
                <TableCell style={style.tableCell} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prestamos.map(prestamo => (
                <TableRow
                  key={prestamo.id}
                  prestamo={prestamo}
                  eliminarPrestamo={eliminarPrestamo}
                >
                  <TableCell align="center">{prestamo.elemento}</TableCell>
                  <TableCell align="center">{prestamo.cantidad} </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => eliminarPrestamo(prestamo.id)}
                    >
                      <CancelRounded fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Container
          style={style.container}
          component="main"
          maxWidth="lg"
          justify="center"
        >
          <Grid container justify="center">
            <Grid item xs={6} md={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="small"
                color="primary"
                style={style.submit}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Fragment>
  );
}

Prestamo.propTypes = {
  prestamo: PropTypes.func.isRequired,
  eliminarPrestamo: PropTypes.func.isRequired
};

export default Prestamo;
