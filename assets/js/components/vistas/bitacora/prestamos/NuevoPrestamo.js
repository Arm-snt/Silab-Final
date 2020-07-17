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
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Save, Send, Cancel } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { TodoContext } from './TodoContext';
import TablaElementosCreate from './TablaElementosCreate';
import { mdiTrumpet } from '@mdi/js';

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
	let a = true;
	let estudiantes = [];
	const [ estudiante_id, setestudiante_id ] = useState('');
	const [ registro, setregistro ] = useState('');
	const [ observacion, setobservacion ] = useState('');
	const [ estado, setestado ] = useState('Activo');
	const [ fecha, setFecha ] = useState(new Date());
	const [ cantidad, setcantidad ] = useState('');
	const [ Stock, setStock ] = useState('');
	const [ editElemento, seteditElemento ] = useState('');
	const [ editElementop, seteditElementop ] = useState([{editElemento:null,cantidad:null}]);

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createPrestamo(event, {
			estudiante_id: estudiante_id,
			registro: registro,
			observacion: observacion,
			estado: estado,
			elemento_id: editElementop,
			fecha_prestamo: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			hora_prestamo: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
			fecha_entrega: null,
			hora_entrega: null
		});
	};
	
	function cargar() {
		editElementop.forEach(elemento => {
			if (elemento.editElemento == editElemento) {
				a=false;
				return a;
			}
			if(elemento.editElemento==null){
				editElementop.splice(editElementop.indexOf(elemento),1)
			}
		});
		if(a){
			editElementop.push({editElemento,cantidad});
			seteditElemento('');
			setcantidad('');
			setStock('');
		}

	}

	const agregarfechayhora = (date) => {
		setFecha(date);
	};

	function historyBack() {
		window.history.back();
		setestudiante_id('');
		setregistro('');
		setobservacion('');
		seteditElemento('');
		seteditElementop([]);
	}

	//compara la informacion de los estudiantes con la de prestamos 
	//si el estudiante no existe en la base de datos prestamo o si existe que la fecha de entrega de su prestamo ya este asignada
	let yaentrego= false;
	let noexiste = false;
	context.est.map((estudiante)=>{
		context.todos.map((prestamos)=>{
			if(estudiante.id==prestamos.estudiante_id && prestamos.fecha_entrega!=null){
				return yaentrego = true;
			}
		})
		if(yaentrego){
			estudiantes.push(estudiante);
			yaentrego = false;
		}

	})

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={estudiantes}
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
						<Grid item md={4} xs={4}>
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
						<Grid item md={4} xs={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Fecha Préstamo"
									format="dd/MM/yyyy"
									value={fecha}
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item md={4} xs={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="Hora Préstamo"
									value={fecha}
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change time'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={3} md={2}>
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
						<Grid item xs={3} md={2}>
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
						<Grid item xs={4} md={4}>
							<Autocomplete
								options={context.ele}
								onChange={(e, a) => {
									seteditElemento(a !== null ? a.id : '');
									setStock(a !== null ? a.stock : '');
								}}
								getOptionLabel={(option) => option.codelemento + '-' + option.elemento}
								renderInput={(params) => <TextField {...params} label="Cargar Elementos" />}
							/>
						</Grid>
						<Grid item xs={4} md={3}>
							<TextField
								disabled
								type="number"
								fullWidth
								value={Stock}
								label="Stock"
								style={{ whiteSpace: 'pre-wrap' }}
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
