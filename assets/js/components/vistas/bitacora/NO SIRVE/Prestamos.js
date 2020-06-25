import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  Paper,
  TextField,
  Link,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiEye, mdiCardSearch, mdiCircleEditOutline } from "@mdi/js";

const style = {
  container: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f5f5f5"
  },
  table: {
    minWidth: 650,
    paddingTop: "40px"
  },
  div: {
    paddingTop: "20px"
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
    marginBottom: 10
  }
};

function createData(estudiante, stock, horas_uso, categoria, estado) {
  return { estudiante, stock, horas_uso, categoria, estado };
}

const rows = [
  createData("23546 - Arduino Nano", "12", "20", "A", "Activo"),
  createData("35484 - Arduino Mega", "10", "5", "A", "Activo"),
  createData("56842 - Tester Hx12", "7", "45", "B", "Activo"),
  createData("74325 - Alineador estatio", "13", "100", "C", "Activo"),
  createData("29886 - Teodolito", "20", "200", "C", "Activo"),
  createData("12325 - Osciloscopio", "4", "150", "C", "Activo")
];

function searchingFor(term) {
  return function(x) {
    return (
      x.estudiante.toLowerCase().includes(term.toLowerCase()) ||
      x.stock.toLowerCase().includes(term.toLowerCase()) ||
      x.horas_uso.toLowerCase().includes(term.toLowerCase()) ||
      x.categoria.toLowerCase().includes(term.toLowerCase()) ||
      x.estado.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

export default class Prestamos extends Component {
  constructor(props) {
    super(props);
    this.onChangeIndex = props.onChangeIndex;
    this.state = {
      rows: rows,
      term: ""
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    const { term, rows } = this.state;

    return (
      <Fragment>
        <div className="App" style={style.div}>
          <form>
            <TextField
              fullWidth
              placeholder="Buscar..."
              onChange={this.searchHandler}
              value={term}
              style={style.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiCardSearch} size={1.5} color="red" />
                  </InputAdornment>
                )
              }}
            />
          </form>
        </div>

        <TableContainer component={Paper} style={style.space}>
          <Table style={style.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Estudiante</TableCell>
                <TableCell align="center">Asignatura-Programa</TableCell>
                <TableCell align="center">Registrado Por</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">N° de Préstamos</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.filter(searchingFor(term)).map(person => (
                <TableRow key={person.estudiante}>
                  <TableCell component="th" scope="row" align="left">
                    {person.estudiante}
                  </TableCell>
                  <TableCell align="center">{person.stock}</TableCell>
                  <TableCell align="center">{person.horas_uso}</TableCell>
                  <TableCell align="center">{person.estado}</TableCell>
                  <TableCell align="center">{person.stock}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Link style={style.link}>
                        <Icon
                          path={mdiEye}
                          size={1}
                          color="red"
                          onClick={e => {
                            this.onChangeIndex(2, e);
                          }}
                        />
                      </Link>
                    </IconButton>
                    <IconButton>
                      <Link style={style.link}>
                        <Icon
                          path={mdiCircleEditOutline}
                          size={1}
                          color="red"
                          onClick={e => {
                            this.onChangeIndex(3, e);
                          }}
                        />
                      </Link>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}
