import React, { useContext, useState } from 'react';
import { Container, Paper, Divider, Grid, TextField, Button } from '@material-ui/core';
import { TodoContext } from './TodoContext';
import { Cancel } from '@material-ui/icons';
//import TablaElementos from './TablaElementos';

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
	const context = useContext(TodoContext);
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ editCodigo, seteditCodigo ] = useState(data['data'].codigo);
	const [ editNombre, seteditNombre ] = useState(data['data'].nombre);
	const [ editPrograma, seteditPrograma ] = useState(data['data'].programa);

	function historyBack() {
		window.history.back();
	}

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
								label="Código"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editNombre}
								fullWidth={true}
								label="Nombre"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editPrograma}
								fullWidth={true}
								label="Programa"
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
								startIcon={<Cancel />}
							>
								Volver
							</Button>
						</Grid>
					</Grid>
					<Grid item md={12} xs={12}>
						<Divider />
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}

export default DetallesLaboratorio;
