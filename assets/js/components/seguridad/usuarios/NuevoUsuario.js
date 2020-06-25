import React, { useContext, useState } from 'react';
import {
	Container,
	Paper,
	Grid,
	Breadcrumbs,
	Link,
	Typography,
	TextField,
	IconButton,
	Divider,
	Button,
	InputAdornment
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
import { Save, Cancel } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const style = {
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
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

function NuevoUsuario() {
	const context = useContext(TodoContext);
	let domain = '@ufpso.edu.co';
	const [ addCodusuario, setAddCodusuario ] = useState('');
	const [ addUsuario, setAddUsuario ] = useState('');
	const [ addNombre, setAddNombre ] = useState('');
	const [ addApellido, setAddApellido ] = useState('');
	const [ addCorreo, setAddCorreo ] = useState('');
	const [ addPassword, setAddPassword ] = useState('');
	const [ addTelefono, setAddTelefono ] = useState('');
	const [ addTipousuario, setAddTipousuario ] = useState('');
	const [ addEstado, setAddEstado ] = useState('Activo');

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createTodo(event, {
			codusuario: addCodusuario,
			usuario: addUsuario,
			nombre: addNombre,
			apellido: addApellido,
			correo: addCorreo + domain,
			password: addPassword,
			telefono: addTelefono,
			tipousuario: addTipousuario,
			estado: addEstado
		});
		setAddCodusuario('');
		setAddUsuario('');
		setAddNombre('');
		setAddApellido('');
		setAddCorreo('');
		setAddPassword('');
		setAddTelefono('');
		setAddTipousuario('');
	};

	function historyBack() {
		window.history.back();
	}

	const tipousuario = [ { tuser: 'Administrador' }, { tuser: 'Laboratorista' }, { tuser: 'Beca-Trabajo' } ];

	return (
		<Container>
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="number"
								value={addCodusuario}
								onChange={(event) => {
									setAddCodusuario(event.target.value);
								}}
								label="Ingrese su Código"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addUsuario}
								onChange={(event) => {
									setAddUsuario(event.target.value);
								}}
								label="Ingrese Usuario"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addNombre}
								onChange={(event) => {
									setAddNombre(event.target.value);
								}}
								label="Ingrese su Nombre"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addApellido}
								onChange={(event) => {
									setAddApellido(event.target.value);
								}}
								label="Ingrese su Apellido"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addCorreo}
								onChange={(event) => {
									setAddCorreo(event.target.value);
								}}
								InputProps={{endAdornment: <InputAdornment position="end">@ufpso.edu.co</InputAdornment>,}}
								label="Ingrese su Correo"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="password"
								value={addPassword}
								onChange={(event) => {
									setAddPassword(event.target.value);
								}}
								label="Ingrese su Contraseña"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={addTelefono}
								onChange={(event) => {
									setAddTelefono(event.target.value);
								}}
								label="Ingrese su Telefono"
								fullWidth={true}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={tipousuario}
								onChange={(e, a) => {
									setAddTipousuario(a !== null ? a.tuser : '');
								}}
								getOptionLabel={(option) => option.tuser}
								renderInput={(params) => <TextField {...params} label="Tipo de Usuario" />}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2} style={style.grid}>
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
export default NuevoUsuario;
