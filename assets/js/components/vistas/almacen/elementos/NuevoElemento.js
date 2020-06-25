import React, { useContext, useState, Fragment } from "react";
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, IconButton, Divider, Button,} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { TodoContext } from "./TodoContext";

const style = {
  container: {
    paddingTop: "20px"
  },
  paper: {
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5"
  },
  link: {
    display: "flex",
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: 20,
    marginBottom: 20,
  },
  space: {
    paddingTop: "20px",
  },
};

function NuevoElemento (){
  //crear state del elemento
  const context = useContext(TodoContext);
  const [CodElemento, setCodElemento]=useState("");
  const [Elemento,setElemento]=useState("");
  const [Stock,setStock]=useState("");
  const [HoraUso,setHoraUso]=useState("");
  const [Categoria,setCategoria]=useState("");
  const [Estado,setEstado]=useState("");

  const onCreateSubmit = (event) =>{
    event.preventDefault();
    context.createTodo(event, {
      codelemento: CodElemento,
      elemento: Elemento,
      stock: Stock,
      horauso: HoraUso,
      categoria: Categoria,
      estado: Estado,
    });
    setCodElemento("");
    setElemento("");
    setStock("");
    setHoraUso("");
    setCategoria("");
    setEstado("");
  }

  function historyBack() {
    window.history.back();
  }

  const estado = [{ state: "Activo" }, { state: "Inactivo" }];
  const categoria = [{ state: "A" }, { state: "B" }, { state: "C" }];

  /*const detalles1 = [
    { state: "2 Horas" },
    { state: "4 Horas" },
    { state: "1 Semana" }
  ];
  const detalles2 = [
    { state: "$1000" },
    { state: "$2000" },
    { state: "$5000" }
  ];
  const detalles3 = [
    { state: "1 Día" },
    { state: "1 Mes" },
    { state: "1 Semestre" }
  ];*/

  return (
      <Container
        style={style.container}
        component="main"
        maxWidth="lg"
        justify="center">
        <Paper style={style.paper}>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  name="codigo"
                  label="Código del elemento"
                  fullWidth={true}
                  value={CodElemento}
                  onChange={(event) => {
                    setCodElemento(event.target.value);
                }}/>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  name="nombre"
                  label="Nombre del elemento"
                  fullWidth
                  value={Elemento}
                  onChange={(event) => {
                    setElemento(event.target.value);
                }}/>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  name="stock"
                  label="Stock"
                  fullWidth
                  value={Stock}
                  onChange={(event) => {
                    setStock(event.target.value);
                }}/>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  name="horas_uso"
                  label="Horas de uso"
                  fullWidth
                  value={HoraUso}
                  onChange={(event) => {
                    setHoraUso(event.target.value);
                }}/>
              </Grid>
              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="estado"
                  options={estado}
                  onChange={(e, a) => {
                    setEstado(a !== null ? a.state : "");
                }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Seleccione un estado"/>
                  )}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  name="categoria"
                  options={categoria}
                  onChange={(e, a) => {
                    setCategoria(a !== null ? a.state : "");
                  }}
                  getOptionLabel={option => option.state}
                  renderInput={params => (
                    <TextField {...params} label="Seleccione categoria" />
                  )}
                />
              </Grid>
              <Grid container spacing={2} justify="center">
                <Grid item xs={3} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    color="primary"
                    style={style.submit}
                    onClick={onCreateSubmit}>
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    color="secondary"
                    style={style.submit}
                    onClick={historyBack}>
                    Cancelar
                  </Button>
                </Grid>
              </Grid>              
            </Grid>
          </form>
        </Paper>
      </Container>
  );
};

export default NuevoElemento;
