import React, { useContext, useState, Fragment } from 'react';
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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
//Mantenimientosimport { v4 as uuidv4 } from "uuid";

const style = {
	container: {
		paddingTop: '20px',
		maxWidth: '1500px'
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
	},
	grid: {
		marginBottom: 20,
		marginTop: 30,
		backgroundColor: '#fff',
		borderRadius: '5px'
	}
};

function NuevoTrabajo() {
	const context = useContext(TodoContext);
	let estudiantes = [];
	let elementoids = [];
	let estudiantesids = [];
	let datosE = [];
	let nuevosE = [];
	const [ Laboratorio, setLaboratorio ] = useState('');
	const [ Departamento, setDepartamento ] = useState('');
	const [ Estudiantes, setEstudiantes ] = useState([]);
	const [ Estudiante, setEstudiante ] = useState(null);
	const [ Docente, setDocente ] = useState(null);
	const [ Particular, setParticular ] = useState(null);
	const [ Telefono, setTelefono ] = useState(null);
	const [ User, setUser ] = useState('');
	const [ Programa, setPrograma ] = useState('');
	const [ Registro, setRegistro ] = useState('');
	const [ Descripcion, setDescripcion ] = useState('');
	const [ Tipo, setTipo ] = useState('Estudiante');
	const [ fecha, setFecha ] = useState(new Date());

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if (Estudiante == '' || Tipo == '' || Registro == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar los campos del Prestamo' ]
			});
		}
		context.createTodo(event, {
			estudiante_id: Estudiante,
			docente_id: Docente,
			particular: Particular,
			telefono: Telefono,
			usuario_id: User,
			registro: Registro,
			descripcion: Descripcion,
			tipo: Tipo,
			fecha_entrada: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			hora_entrada: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
			fecha_salida: null,
			hora_salida: null
		});
		setEstudiante('');
		setDocente('');
		setParticular('');
		setTelefono('');
		setUser('');
		setRegistro('');
		setDescripcion('');
		setTipo('');
	};

	const agregarfechayhora = (date) => {
		setFecha(date);
	};

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
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={context.dep}
								onChange={(e, a) => {
									setDepartamento(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Departamento" />}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={context.lab}
								onChange={(e, a) => {
									setLaboratorio(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codlaboratorio + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Laboratorio" />}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={context.usu}
								onChange={(e, a) => {
									setUser(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Laboratorista" />}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item md={4} xs={8}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Seleccione opción</FormLabel>
								<RadioGroup
									name="Tipo"
									value={Tipo}
									onChange={(event) => {
										setTipo(event.target.value);
									}}
								>
									<FormControlLabel
										value="Estudiante"
										control={<Radio color="primary" />}
										label="Estudiante"
										labelPlacement="start"
									/>
									<FormControlLabel
										value="Docente"
										control={<Radio color="primary" />}
										label="Docente"
										labelPlacement="start"
									/>
									<FormControlLabel
										value="Particular"
										control={<Radio color="primary" />}
										label="Particular"
										labelPlacement="start"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item md={4} xs={4}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Fecha Entrada"
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
									label="Hora Entrada"
									value={fecha}
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change time'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
					</Grid>
					{Tipo == 'Estudiante' ? (
						<Grid container spacing={2}>
							<Grid item md={4} xs={6}>
								<Autocomplete
									options={context.pro}
									onChange={(e, a) => {
										console.log(Estudiantes);
										setPrograma(a !== null ? a.id : '');
										context.est.map((res)=>{
											if(res.programa_id==Programa){
												Estudiantes.push(res);
											}
										});
										setEstudiantes(Estudiantes);
										}
									}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} label="Programa Académico" />}
								/>
							</Grid>
							<Grid item md={4} xs={6}>
								<Autocomplete
									options={Estudiantes}
									onChange={(e, a) => {
										setEstudiante(a !== null ? a.id : '');
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} label="Estudiante" />}
								/>
							</Grid>
							<Grid item md={3} xs={3}>
								<TextField
									type="text"
									value={Telefono}
									onChange={(event) => {
										setTelefono(event.target.value);
									}}
									label="Teléfono"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					) : Tipo == 'Docente' ? (
						<Grid container spacing={2}>
							<Grid item md={4} xs={6}>
								<Autocomplete
									options={context.doc}
									onChange={(e, a) => {
										setDocente(a !== null ? a.id : '');
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} label="Docente" />}
								/>
							</Grid>
							<Grid item md={3} xs={3}>
								<TextField
									type="text"
									value={Telefono}
									onChange={(event) => {
										setTelefono(event.target.value);
									}}
									label="Teléfono"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={2}>
							<Grid item md={4} xs={4}>
								<TextField
									type="text"
									value={Particular}
									onChange={(event) => {
										setParticular(event.target.value);
									}}
									label="Particular"
									fullWidth={true}
								/>
							</Grid>
							<Grid item md={3} xs={3}>
								<TextField
									type="text"
									value={Telefono}
									onChange={(event) => {
										setTelefono(event.target.value);
									}}
									label="Teléfono"
									fullWidth={true}
								/>
							</Grid>
						</Grid>
					)}
					<Grid container spacing={2}>
						<Grid item md={8} xs={6}>
							<TextField
								type="text"
								value={Descripcion}
								onChange={(event) => {
									setDescripcion(event.target.value);
								}}
								label="Descripción Asesoria"
								fullWidth={true}
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
export default NuevoTrabajo;
