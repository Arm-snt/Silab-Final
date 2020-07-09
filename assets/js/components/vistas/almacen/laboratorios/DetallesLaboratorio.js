import React, { useContext, useState } from 'react';
import { Container, Paper, Divider, Grid, TextField, Button } from '@material-ui/core';
import { TodoContext } from './TodoContext';
import { Reply } from '@material-ui/icons';
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
		backgroundColor: '#fff',
		borderRadius: '5px'
	}
};

function DetallesLaboratorio(data) {
	console.log(data);
	const context = useContext(TodoContext);
	let user = [];
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ editCodigo, seteditCodigo ] = useState(data['data'].codlaboratorio);
	const [ editNombre, seteditNombre ] = useState(data['data'].nombre);
	const [ editUbicacion, seteditUbicacion ] = useState(data['data'].ubicacion);
	const [ editObservacion, seteditObservacion ] = useState(data['data'].observacion);
	const [ editUsuario, seteditUsuario ] = useState(data['data'].usuario_id);
	const [ editElementop, seteditElementop ] = useState([]);

	function historyBack() {
		window.history.back();
	}

	context.usu.map((res) => {
		if (res.id == editUsuario) {
			user=res;
		}
	});

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editCodigo}
								fullWidth={true}
								label="Código Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editNombre}
								fullWidth={true}
								label="Nombre Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editUbicacion}
								fullWidth={true}
								label="Ubicación Laboratorio"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editObservacion}
								fullWidth={true}
								label="Observación"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={user.codusuario + ' - ' + user.nombre}
								fullWidth={true}
								label="Laboratorista"
							/>
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

export default DetallesLaboratorio;
