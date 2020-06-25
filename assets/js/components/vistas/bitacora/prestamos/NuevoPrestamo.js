import React, { useContext, useState } from 'react';
import { Container, Divider, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Save, Send, Cancel } from '@material-ui/icons';
import { TodoContext } from './TodoContext';
import TablaElementosCreate from './TablaElementosCreate';

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

function NuevoPrestamo() {
	const context = useContext(TodoContext);
	//console.log(data);
	const [ estudiante_id, setestudiante_id ] = useState('');
	const [ registro, setregistro ] = useState('');
	const [ observacion, setobservacion ] = useState('');
	const [ estado, setestado ] = useState('Activo');
	const [ cantidad, setcantidad ] = useState('');
	const [ editElemento, seteditElemento ] = useState('');
	const [ editElementop, seteditElementop ] = useState([]);

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createPrestamo(event, {
			estudiante_id: estudiante_id,
			registro: registro,
			observacion: observacion,
			estado: estado,
			elemento_id: editElementop
		});
		setestudiante_id('');
		setregistro('');
		setobservacion('');
		seteditElemento('');
		seteditElementop([]);
	};

	function cargar() {
		editElementop.push({ editElemento, cantidad });
		seteditElemento('');
		setcantidad('');
	}

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={context.est}
								onChange={(e, a) => {
									setestudiante_id(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codigo + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Estudiante" />}
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={registro}
								onChange={(event) => {
									setregistro(event.target.value);
								}}
								fullWidth={true}
								label="Registrado Por:"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								multiline
								value={observacion}
								onChange={(event) => {
									setobservacion(event.target.value);
								}}
								fullWidth={true}
								label="Observaciones"
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}
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
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
						<Grid item xs={4} md={6}>
							<Autocomplete
								options={context.ele}
								onChange={(e, a) => {
									seteditElemento(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codelemento + '-' + option.elemento}
								renderInput={(params) => <TextField {...params} label="Cargar Elementos" />}
							/>
						</Grid>
						<Grid item xs={4} md={3}>
							<TextField
								type="number"
								fullWidth
								value={cantidad}
								onChange={(event) => {
									setcantidad(event.target.value);
								}}
								label="Cantidad Solicitada"
								style={{ whiteSpace: 'pre-wrap' }}
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
					<TablaElementosCreate elemento={editElementop} />
				</form>
			</Paper>
		</Container>
	);
}

export default NuevoPrestamo;
