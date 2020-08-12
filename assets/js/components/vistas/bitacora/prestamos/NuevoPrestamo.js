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
	FormLabel,
	InputAdornment
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
	const [ editElementop, seteditElementop ] = useState([ { editElemento: null, cantidad: null } ]);
	const [ error, seterror ] = useState({ registro: false, cantidad: false, observacion: false });
	const [ textoAyuda, settextoAyuda ] = useState({ registro: '', cantidad: '', observacion: '' });

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if (estudiante_id == '' || registro == '' || observacion == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar los campos del Prestamo' ]
			});
		}
		context.createPrestamo(event, {
			estudiante_id: estudiante_id,
			registro: registro + '@ufpso.edu.co',
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
		if (editElemento == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe seleccionar un elemento para cargar al Prestamo' ]
			});
		} else if (cantidad == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe agregar una cantidad al elemento del Prestamo' ]
			});
		} else {
			editElementop.forEach((elemento) => {
				if (elemento.editElemento == editElemento) {
					a = false;
					return (
						a,
						context.setMessage({
							level: 'error',
							text: [ 'El elemento que intenta cargar ya se encuentra en el Prestamo' ]
						}),
						seteditElemento(''),
						setcantidad(''),
						setStock('')
					);
				}
				if (elemento.editElemento == null) {
					editElementop.splice(editElementop.indexOf(elemento), 1);
				}
			});
			if (a) {
				console.log(parseInt(Stock), parseInt(cantidad));
				if (parseInt(Stock) > parseInt(cantidad) || parseInt(Stock) == parseInt(cantidad)) {
					editElementop.push({ editElemento, cantidad });
					seteditElemento('');
					setcantidad('');
					setStock('');
				} else {
					context.setMessage({
						level: 'error',
						text: [ 'La cantidad solicitada del elemento supera el stock disponible!' ]
					});
					seteditElemento('');
					setcantidad('');
					setStock('');
				}
			}
		}
	}
	const eliminar = (data) => {
		console.log(data);
		editElementop.splice(editElementop.indexOf(data), 1);
		context.setMessage({
			level: 'success',
			text: [ 'Se eliminó el elemento de la lista de prestamo!' ]
		});
	};

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
	let yaentrego = false;
	let noexiste = false;
	context.est.map((estudiante) => {
		context.todos.map((prestamos) => {
			if (estudiante.id == prestamos.estudiante_id && prestamos.fecha_entrega != null) {
				return (yaentrego = true);
			}
		});
		if (yaentrego) {
			estudiantes.push(estudiante);
			yaentrego = false;
		}
	});

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
								error={error.registro}
								type="text"
								value={registro}
								onChange={(event) => {
									setregistro(event.target.value);
									if (registro.length > 15 || !/^[A-Za-z\s]+$/.test(registro)) {
										error.registro = true;
										textoAyuda.registro = 'Utilice un correo institucional';
										seterror(error);
										settextoAyuda(textoAyuda);
									} else {
										error.registro = false;
										textoAyuda.registro = '';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.registro}
								fullWidth={true}
								label="Registrado Por:"
								InputProps={{
									endAdornment: <InputAdornment position="end">@ufpso.edu.co</InputAdornment>
								}}
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextField
								type="text"
								multiline
								error={error.observacion}
								value={observacion}
								onChange={(event) => {
									setobservacion(event.target.value);
									if (observacion.length < 14) {
										error.observacion = true;
										textoAyuda.observacion = 'Minimo 8 caracteres';
										seterror(error);
										settextoAyuda(textoAyuda);
									} else {
										error.observacion = true;
										textoAyuda.observacion = '';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.observacion}
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
						<Grid item xs={3} md={2}>
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
								error={error.cantidad}
								value={cantidad}
								onChange={(event) => {
									setcantidad(event.target.value);
									if (cantidad.length > 1) {
										error.cantidad = true;
										textoAyuda.cantidad = 'La cantidad debe ser de 2 digitos';
										seterror(error);
										settextoAyuda(textoAyuda);
									} else {
										error.cantidad = false;
										textoAyuda.cantidad = '';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.cantidad}
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
					<TablaElementosCreate elemento={editElementop} eliminar={eliminar} />
				</form>
			</Paper>
		</Container>
	);
}

export default NuevoPrestamo;
