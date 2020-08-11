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
	const [ Laboratorio, setLaboratorio ] = useState([]);
	const [ Departamento, setDepartamento ] = useState([]);
	const [ Estudiante, setEstudiante ] = useState([]);
	const [ IdEstudiante, setIdEstudiante ] = useState([]);
	const [ Docente, setDocente ] = useState([]);
	const [ Particular, setParticular ] = useState('');
	const [ Telefono, setTelefono ] = useState('');
	const [ TelefonoEst, setTelefonoEst ] = useState('');
	const [ User, setUser ] = useState([]);
	const [ Programa, setPrograma ] = useState([]);
	const [ Registro, setRegistro ] = useState('');
	const [ Mensaje, setMensaje ] = useState('');
	const [ Descripcion, setDescripcion ] = useState('');
	const [ Tipo, setTipo ] = useState('Estudiante');
	const [ fecha, setFecha ] = useState(new Date());

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if ((IdEstudiante == '' || Programa == '')  && Docente =='' && (Particular=='' || Telefono == '')) {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe Seleccionar el encargado del del Trabajo' ]
			});
		} else if(Registro == '' || User == '' || Descripcion == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar los campos del trabajo' ]
			});
		}
		if(IdEstudiante!=[]){
			setParticular(null);
			setDocente(null);
		}else if(Docente!=[]){
			setIdEstudiante(null);
			setParticular(null);
		}else{
			setDocente(null);
			setIdEstudiante(null);
		}
		console.log({
			estudiante_id: IdEstudiante,
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
		setIdEstudiante([]);
		setDocente([]);
		setPrograma([]);
		setUser([]);
		setLaboratorio([]);
		setDepartamento([]);
		setParticular('');
		setTelefono('');
		setRegistro('');
		setDescripcion('');
		setTipo('Estudiante');
		setMensaje('');
		/*context.createTodo(event, {
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
			setMensaje('');
		*/
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
								renderInput={(params) => <TextField {...params} value={Mensaje} label="Departamento" />}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								type="text"
								value={Registro}
								onChange={(event) => {
									setRegistro(event.target.value);
								}}
								label="Registrado Por"
								fullWidth={true}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={context.usu}
								onChange={(e, a) => {
									setUser(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} value={Mensaje} label="Laboratorista" />}
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
										setPrograma([]);
										setEstudiante([]);
										setTelefono('');
										setTelefonoEst('');
										setDocente([]);
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
										let estudiantes = [];
										setPrograma(a !== null ? a.id : '');
										context.est.map((res) => {
											if (res.programa_id == a.id) {
												estudiantes.push(res);
											}
										});
										setEstudiante(estudiantes);
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} value={Mensaje} label="Programa Académico" />}
								/>
							</Grid>
							<Grid item md={4} xs={6}>
								<Autocomplete
									options={Estudiante}
									onChange={(e, a) => {
										setIdEstudiante(a !== null ? a.id : '');
										setTelefonoEst(a !== null ? a.telefono : '');
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} value={Mensaje} label="Estudiante" />}
								/>
							</Grid>
							<Grid item xs={4} md={3}>
								<TextField
									disabled
									fullWidth
									value={TelefonoEst}
									label="Teléfono"
									style={{ whiteSpace: 'pre-wrap' }}
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
										setTelefonoEst(a !== null ? a.telefono : '');
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => <TextField {...params} value={Mensaje} label="Docente" />}
								/>
							</Grid>
							<Grid item xs={4} md={3}>
								<TextField
									disabled
									fullWidth
									value={TelefonoEst}
									label="Teléfono"
									style={{ whiteSpace: 'pre-wrap' }}
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
							<Grid item xs={4} md={3}>
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
