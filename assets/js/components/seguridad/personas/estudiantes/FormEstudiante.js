import React, { useContext, useState } from 'react'
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TodoContext } from './TodoContext'
import { Save, Send, Cancel } from '@material-ui/icons'

const style = {
  container: {
    padding: '20px',
  },
  paper: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '100%',
  },
  submit: {
    marginTop: 20,
    marginBottom: 20,
  },
  space: {
    paddingTop: '20px',
  },
}

function FormEstudiante() {
  const context = useContext(TodoContext)
  const [addCodigo, setCodigo] = useState('')
  const [addNombre, setNombre] = useState('')
  const [addPrograma, setPrograma] = useState('')
  const [addEmail, setEmail] = useState('')
  const [addTipodoc, setTipodoc] = useState('')
  const [addDocumento, setDocumento] = useState('')
  const [addTelefono, setTelefono] = useState('')
  const [addEstado, setEstado] = useState('Activo')


  const onCreateSubmit = (event) => {
    event.preventDefault()
    context.createTodo(event, {
      codigo: addCodigo,
      nombre: addNombre,
      programa: addPrograma,
      email: addEmail,
      tipodoc: addTipodoc,
      documento: addDocumento,
      telefono: addTelefono,
      estado: addEstado,

    })
    setCodigo('')
    setNombre('')
    setPrograma('')
    setEmail('')
    setTipodoc('')
    setDocumento('')
    setTelefono('')

  }

  function historyBack() {
    window.history.back()
  }

  const programas = [
    { state: 'Ingeniería Civil' },
    { state: 'Ingeniería Mecánica' },
    { state: 'Ingeniería de Sistemas' },
  ]
  const tipos = [{ state: "CC" }, { state: "TI" }];


  return (
    <Container
      style={style.container}
      component="main"
      maxWidth="lg"
      justify="center"
    >
      <Paper style={style.paper}>
        <form style={style.form} onSubmit={onCreateSubmit}>
          <Grid container spacing={2}>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addCodigo}
                onChange={(event) => {
                  setCodigo(event.target.value)
                }}
                label="Código"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addNombre}
                onChange={(event) => {
                  setNombre(event.target.value)
                }}
                label="Nombre"
                fullWidth={true}
              />
            </Grid>

            <Grid item md={4} xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={programas}
                onChange={(e, a) => {
                  setPrograma(a !== null ? a.state : '')
                }}
                getOptionLabel={(option) => option.state}
                renderInput={(params) => (
                  <TextField {...params} label="Programa" />
                )}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addEmail}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                label="Email"
                fullWidth={true}
              />
            </Grid>

            <Grid item md={4} xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={tipos}
                onChange={(e, a) => {
                  setTipodoc(a !== null ? a.state : '')
                }}
                getOptionLabel={(option) => option.state}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo de Documento" />
                )}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addDocumento}
                onChange={(event) => {
                  setDocumento(event.target.value)
                }}
                label="Documento"
                fullWidth={true}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={addTelefono}
                onChange={(event) => {
                  setTelefono(event.target.value)
                }}
                label="Teléfono"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="small"
                color="primary"
                style={style.submit}
                endIcon={<Save />}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={3} md={2}>
              <Button
                variant="contained"
                fullWidth
                size="small"
                color="secondary"
                style={style.submit}
                onClick={historyBack}
                startIcon={<Cancel />}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default FormEstudiante
