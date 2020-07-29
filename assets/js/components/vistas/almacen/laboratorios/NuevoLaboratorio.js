import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from './TodoContext';
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Save, Cancel } from '@material-ui/icons';

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
	}
};

function NuevoLaboratorio() {
	const context = useContext(TodoContext);
	let user = [];
	const [ addUsuario_id, setaddUsuario_id ] = useState(null);
	const [ addCodLaboratorio, setaddCodLaboratorio ] = useState('');
	const [ addNombre, setaddNombre ] = useState('');
	const [ addUbicacion, setaddUbicacion ] = useState('');
	const [ addObservacion, setaddObservacion ] = useState('');
	const [ addEstado, setAddEstado ] = useState('Activo');

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createTodo(event, {
			usuario_id: addUsuario_id,
			codlaboratorio: addCodLaboratorio,
			nombre: addNombre,
			ubicacion: addUbicacion,
			observacion: addObservacion,
			estado: addEstado
		});
		setaddUsuario_id('');
		setaddCodLaboratorio('');
		setaddNombre('');
		setaddUbicacion('');
		setaddObservacion('');
		
	};

	context.usu.map((res) => {
		if (res.tipousuario === "Laboratorista") {
			user.push(res);
		}
	});

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={addCodLaboratorio}
								onChange={(event) => {
									setaddCodLaboratorio(event.target.value);
								}}
								fullWidth={true}
								label="Código Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={addNombre}
								onChange={(event) => {
									setaddNombre(event.target.value);
								}}
								fullWidth={true}
								label="Nombre Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={addUbicacion}
								onChange={(event) => {
									setaddUbicacion(event.target.value);
								}}
								fullWidth={true}
								label="Ubicación Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={addObservacion}
								onChange={(event) => {
									setaddObservacion(event.target.value);
								}}
								fullWidth={true}
								label="Observación"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								id="combo-box-demo"
								options={user}
								onChange={(e, a) => {
									setaddUsuario_id(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Laboratorista" />}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}
								endIcon={<Save />}
							>
								Guardar
							</Button>
						</Grid>
						<Grid item xs={2} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
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


	);
}

export default NuevoLaboratorio;
