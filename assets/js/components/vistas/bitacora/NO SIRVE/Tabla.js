import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Container, Paper } from "@material-ui/core";

const style = {
  table: {
    minWidth: 650,
    paddingTop: "40px"
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
  }
};

const Tabla = ({ perfil }) => (
  <Fragment>
    <Container
      style={style.container}
      component="main"
      maxWidth="lg"
      justify="center"
    >
      <TableContainer component={Paper} style={style.space}>
        <Table style={style.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Estudiante</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Registrado Por</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{perfil.estudiante}</TableCell>
              <TableCell align="center">{perfil.descripcion} </TableCell>
              <TableCell align="center">{perfil.registro} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </Fragment>
);
export default Tabla;
