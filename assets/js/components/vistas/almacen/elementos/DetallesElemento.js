import React, { useContext, useState } from 'react';
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';

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

function DetallesElemento(data) {
	console.log(data);
	const context = useContext(TodoContext);
	const [ editUsuario, seteditUsuario ] = useState('');
	const [ editCodigo, seteditCodigo ] = useState('');
	const [ editNombre, seteditNombre ] = useState('');
	const [ editUbicacion, seteditUbicacion ] = useState('');
	const [ editObservacion, seteditObservacion ] = useState('');
	const [ clear, setClear ] = useState(false);

	const onEditSubmit = (todoId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: todoId,
			usuario_id: editUsuario,
			codlaboratorio: editCodigo,
			nombre: editNombre,
			ubicacion: editUbicacion,
			observacion: editObservacion
		});
	};

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
								value={data['data'].codlaboratorio}
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
								value={data['data'].nombre}
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
								value={data['data'].ubicacion}
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
								value={data['data'].observacion}
								onChange={(event) => {
									seteditObservacion(event.target.value);
								}}
								fullWidth={true}
								label="Observación"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								id="combo-box-demo"
								options={context.usu}
								onChange={(e, a) => {
									seteditUsuario(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Encargado" />}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onEditSubmit}
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

export default DetallesElemento;
