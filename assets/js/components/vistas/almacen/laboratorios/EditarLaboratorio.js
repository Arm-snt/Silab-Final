import React, { useContext, useState } from 'react';
import { Container, Divider, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
import { Save, Send, Cancel } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import TablaElementos from './TablaElementos';

const style = {
	container: {
		padding: '20px'
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

function EditarLaboratorio(data) {
	const context = useContext(TodoContext);
	let user = [];
	let ele = [];
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ editCodigo, seteditCodigo ] = useState(data['data'].codlaboratorio);
	const [ editNombre, seteditNombre ] = useState(data['data'].nombre);
	const [ editUbicacion, seteditUbicacion ] = useState(data['data'].ubicacion);
	const [ editObservacion, seteditObservacion ] = useState(data['data'].observacion);
	const [ editEstado, seteditEstado ] = useState(data['data'].estado);
	const [ editUsuario, seteditUsuario ] = useState(data['data'].usuario_id);
	const [ editElemento, seteditElemento ] = useState('');
	const [ editElementop, seteditElementop ] = useState([]);

	context.usu.map((res) => {
		if (res.tipousuario === 'Laboratorista') {
			user.push(res);
		}
	});

	context.ele.map((res) => {
		if (res.estado === 'Activo' && res.laboratorio_id != editId) {
			ele.push(res);
		}
	});

	console.log(data);
	const onEditSubmit = (editId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: editId,
			codlaboratorio: editCodigo,
			nombre: editNombre,
			ubicacion: editUbicacion,
			observacion: editObservacion,
			estado: editEstado,
			usuario_id: editUsuario
		});
		if (editElementop.length) {
			context.updateElemento({
				id: editElementop,
				laboratorio_id: editId
			});
		}
	};

	function cargar() {
		editElementop.push(editElemento);
		seteditElemento('');
	}

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form} onSubmit={onEditSubmit.bind(this, editId)}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editCodigo}
								onChange={(event) => {
									seteditCodigo(event.target.value);
								}}
								fullWidth={true}
								label="Código Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editNombre}
								onChange={(event) => {
									seteditNombre(event.target.value);
								}}
								fullWidth={true}
								label="Nombre Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editUbicacion}
								onChange={(event) => {
									seteditUbicacion(event.target.value);
								}}
								fullWidth={true}
								label="Ubicación Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editObservacion}
								onChange={(event) => {
									seteditObservacion(event.target.value);
								}}
								fullWidth={true}
								label="Observación"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={user}
								onChange={(e, a) => {
									seteditUsuario(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + '-' + option.usuario}
								renderInput={(params) => <TextField {...params} label="Laboratorista" />}
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
								options={ele}
								onChange={(e, a) => {
									seteditElemento(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codelemento + '-' + option.elemento}
								renderInput={(params) => <TextField {...params} label="Cargar Elementos" />}
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
					<TablaElementos data={editId} elemento={editElementop} />
				</form>
			</Paper>
		</Container>
	);
}

export default EditarLaboratorio;
