import React, { useContext, useState } from 'react';
import { Container, Paper, Divider, Grid, TextField, Button } from '@material-ui/core';
import { TodoContext } from './TodoContext';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
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

function DetallesPrestamo(data) {
	const context = useContext(TodoContext);
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ codigo, setCodigo ] = useState(data['data'].codigo);
	const [ nombre, setNombre ] = useState(data['data'].nombre);
	const [ editregistro, seteditregistro ] = useState(data['data'].registro);
	const [ editObservacion, seteditObservacion ] = useState(data['data'].observacion);
	const [ editEstado, seteditEstado ] = useState(data['data'].estado);
	const [ fecha, setFecha ] = useState(data['data'].fecha_prestamo);
	const [ hora, setHora ] = useState(data['data'].hora_prestamo);
	const [ editElementop, seteditElementop ] = useState([]);

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
								value={codigo + '-' + nombre}
								fullWidth={true}
								label="Estudiante"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editregistro}
								fullWidth={true}
								label="Registrado Por"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								disabled
								value={editObservacion}
								fullWidth={true}
								label="Observaciones"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField type="text" disabled value={editEstado} fullWidth={true} label="Estado" />
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField type="text" disabled value={fecha} fullWidth={true} label="Fecha del Préstamo" />
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField type="text" disabled value={hora} fullWidth={true} label="Hora del Préstamo" />
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

export default DetallesPrestamo;
