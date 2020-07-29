import React, { useContext, useState } from 'react'
import {
  Container,
  Divider,
  Paper,
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
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
  grid: {
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
}

function EditarEstudiante(data) {
  const context = useContext(TodoContext)
  console.log(data)
  const [editId, seteditId] = useState(data['data'].id)
  const [editCodigo, seteditCodigo] = useState(data['data'].codigo)
  const [editNombre, seteditNombre] = useState(data['data'].nombre)
  const [editPrograma, seteditPrograma] = useState(data['data'].programa)
  const [editEmail, seteditEmail] = useState(data['data'].email)
  const [editTipodoc, seteditTipodoc] = useState(data['data'].tipodoc)
  const [editDocumento, seteditDocumento] = useState(data['data'].documento)
  const [editTelefono, seteditTelefono] = useState(data['data'].telefono)
  const [editEstado, seteditEstado] = useState(data['data'].estado)

  const onEditSubmit = (editId, event) => {
    event.preventDefault()
    context.updateTodo({
      id: editId,
      codigo: editCodigo,
      nombre: editNombre,
      programa: editPrograma,
	  email: editEmail,
	  tipodoc: editTipodoc,
      documento: editDocumento,
	  telefono: editTelefono,
      estado: editEstado,	  
    })
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
        <form style={style.form} onSubmit={onEditSubmit.bind(this, editId)}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={6}>
              <TextField
                type="text"
                value={editCodigo}
                onChange={(event) => {
                  seteditCodigo(event.target.value)
                }}
                fullWidth={true}
                label="Código"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                type="text"
                value={editNombre}
                onChange={(event) => {
                  seteditNombre(event.target.value)
                }}
                fullWidth={true}
                label="Nombre Estudiante"
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={programas}
                onChange={(e, a) => {
                  seteditPrograma(a !== null ? a.state : '')
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
                value={editEmail}
                onChange={(event) => {
                  seteditEmail(event.target.value)
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
                  seteditTipodoc(a !== null ? a.state : '')
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
                value={editDocumento}
                onChange={(event) => {
                  seteditDocumento(event.target.value)
                }}
                label="Documento"
                fullWidth={true}
              />
            </Grid>
			<Grid item md={4} xs={6}>
              <TextField
                type="text"
                value={editTelefono}
                onChange={(event) => {
                  seteditTelefono(event.target.value)
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

export default EditarEstudiante
