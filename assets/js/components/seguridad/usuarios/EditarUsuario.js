import React, { useContext, useState } from 'react';
import { Container, Divider, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
import { Save, Send, Cancel } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import TablaLaboratorios from './TablaLaboratorios';

const style = {
	container: {
		padding: '10px'
	},
	paper: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	form: {
		width: '100%'
	},
	submit: {
		marginTop: 20,
		marginBottom: 20
	},
	space: {
		paddingTop: '20px'
	},
	grid: {
		marginBottom: 20,
		marginTop: 30,
		backgroundColor: '#fff',
		borderRadius: '5px'
	}
};

function EditarUsuario(data) {
	const context = useContext(TodoContext);
	let laboratorios = [];
	const [ editarId, setEditarId ] = useState(data['data'].id);
	const [ editarCodusuario, setEditarCodusuario ] = useState(data['data'].codusuario);
	const [ editarUsuario, setEditarUsuario ] = useState(data['data'].usuario);
	const [ editarNombre, setEditarNombre ] = useState(data['data'].nombre);
	const [ editarApellido, setEditarApellido ] = useState(data['data'].apellido);
	const [ editarCorreo, setEditarCorreo ] = useState(data['data'].correo);
	const [ editarPassword, setEditarPassword ] = useState(data['data'].password);
	const [ editarTelefono, setEditarTelefono ] = useState(data['data'].telefono);
	const [ editarTipousuario, setEditarTipousuario ] = useState(data['data'].tipousuario);
	const [ editarEstado, setEditarEstado ] = useState(data['data'].estado);
	const [ editarLaboratorio, setEditarLaboratorio ] = useState('');
	const [ arrayLaboratorios, setArrayLaboratorios ] = useState([]);
	const [ eliminarUsuario, setEliminarUsuario ] = useState('');

	context.lab.map((res) => {
		if (res.usuario_id === null) {
			laboratorios.push(res);
		}
	});

	const onEditSubmit = (editarId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: editarId,
			codusuario: editarCodusuario,
			usuario: editarUsuario,
			nombre: editarNombre,
			apellido: editarApellido,
			correo: editarCorreo,
			password: editarPassword,
			telefono: editarTelefono,
			tipousuario: editarTipousuario,
			estado: editarEstado
		});
		if (arrayLaboratorios.constructor === Array) {
			context.updateLaboratorio({
				id: arrayLaboratorios,
				usuario_id: editarId
			});
		}
	};

	function cargar() {
		arrayLaboratorios.push(editarLaboratorio);
		setEditarLaboratorio('');
	}

	function historyBack() {
		window.history.back();
	}

	const tipousuario = [ { state: 'Administrador' }, { state: 'Laboratorista' }, { state: 'Beca-Trabajo' } ];

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form} onSubmit={onEditSubmit.bind(this, editarId)}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarCodusuario}
								onChange={(event) => {
									setEditarCodusuario(event.target.value);
								}}
								fullWidth
								label="Código de Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarUsuario}
								onChange={(event) => {
									setEditarUsuario(event.target.value);
								}}
								fullWidth
								label="Nick de Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarNombre}
								onChange={(event) => {
									setEditarNombre(event.target.value);
								}}
								fullWidth
								label="Nombre del Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarApellido}
								onChange={(event) => {
									setEditarApellido(event.target.value);
								}}
								fullWidth
								label="Apellido del Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarCorreo}
								onChange={(event) => {
									setEditarCorreo(event.target.value);
								}}
								fullWidth
								label="Correo del Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="password"
								value={editarPassword}
								onChange={(event) => {
									setEditarPassword(event.target.value);
								}}
								fullWidth
								label="Contraseña"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarTelefono}
								onChange={(event) => {
									setEditarTelefono(event.target.value);
								}}
								fullWidth
								label="Telefono"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={tipousuario}
								onChange={(e, a) => {
									setEditarTipousuario(a !== null ? a.state : '');
								}}
								getOptionLabel={(option) => option.state}
								renderInput={(params) => <TextField {...params} label="Tipo de usuario" />}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarEstado}
								onChange={(event) => {
									setEditarEstado(event.target.value);
								}}
								fullWidth
								label="Estado"
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
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
						<Grid item xs={6} md={6}>
							<Autocomplete
								options={laboratorios}
								onChange={(e, a) => {
									setEditarLaboratorio(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codlaboratorio + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Asignar Laboratorio" />}
							/>
						</Grid>
						<Grid item xs={3} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="small"
								color="primary"
								style={style.submit}
								endIcon={<Send />}
								onClick={() => {
									cargar();
								}}
							>
								Cargar
							</Button>
						</Grid>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<TablaLaboratorios data={editarId} laboratorio={arrayLaboratorios} />
				</form>
			</Paper>
		</Container>
	);
}

export default EditarUsuario;
