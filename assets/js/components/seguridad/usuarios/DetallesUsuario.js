import React, { useContext, useState } from 'react';
import { Container, Paper, Divider, Grid, TextField, Button } from '@material-ui/core';
import { TodoContext } from './TodoContext';
import { Reply } from '@material-ui/icons';
import TablaLaboratorios from './TablaLaboratorios';
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

function DetallesUsuario(data) {
	const context = useContext(TodoContext);
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
	const [ arrayLaboratorios, setArrayLaboratorios ] = useState([]);

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarCodusuario}
								fullWidth
								disabled
								label="Código de Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="text" value={editarUsuario} fullWidth disabled label="Nick de Usuario" />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="text" value={editarNombre} disabled fullWidth label="Nombre del Usuario" />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarApellido}
								disabled
								fullWidth
								label="Apellido del Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="text" value={editarCorreo} disabled fullWidth label="Correo del Usuario" />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="password" value={editarPassword} disabled fullWidth label="Contraseña" />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="text" value={editarTelefono} disabled fullWidth label="Telefono" />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={editarTipousuario}
								disabled
								fullWidth
								label="Tipo de Usuario"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField type="text" value={editarEstado} disabled fullWidth label="Estado" />
						</Grid>
						<Grid item xs={3} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="small"
								color="primary"
								style={style.submit}
								onClick={historyBack}
								startIcon={<Reply />}
							>
								Volver
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
						<TablaLaboratorios data={editarId} laboratorio={arrayLaboratorios} />
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
export default DetallesUsuario;
