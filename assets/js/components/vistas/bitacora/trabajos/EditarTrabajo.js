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
import { TodoContext } from './TodoContext';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Save, Send, Cancel } from '@material-ui/icons';

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
	},
	group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
};

function EditarTrabajo(data) {
	const onChangeIndex = props.onChangeIndex;
	const context = useContext(TodoContext);
	let telefon = '';
	let info = '';
	let programa_id = '';
	const [ editId, setId ] = useState(data['data'].id);
	const [ Estudiante, setEstudiante ] = useState([]);
	const [ IdEstudiante, setIdEstudiante ] = useState(data['data'].estudiante_id);
	const [ Docente, setDocente ] = useState(data['data'].docente_id);
	const [ Particular, setParticular ] = useState(data['data'].particular);
	const [ Tipo, setTipo ] = useState(data['data'].tipo);
	const [ Telefono, setTelefono ] = useState(data['data'].telefono);
	const [ TelefonoEst, setTelefonoEst ] = useState(
		Tipo == 'Estudiante'
			? (context.est.map((res) => {
					if (res.id == IdEstudiante) {
						telefon = res.telefono;
					}
				}),
				telefon)
			: Tipo == 'Docente'
				? (context.doc.map((res) => {
						if (res.id == Docente) {
							telefon = res.telefono;
						}
					}),
					telefon)
				: ''
	);
	const [ User, setUser ] = useState(data['data'].usuario_id);
	const [ Programa, setPrograma ] = useState(
		Tipo == 'Estudiante'
			? (context.est.map((res) => {
					if (res.id == IdEstudiante) {
						programa_id = res.programa_id;
					}
				}),
				programa_id)
			: ''
	);
	const [ Registro, setRegistro ] = useState(data['data'].registro);
	const [ Mensaje, setMensaje ] = useState('');
	const [ Descripcion, setDescripcion ] = useState(data['data'].descripcion);
	const [ fecha, setFecha ] = useState(new Date());

	console.log(data);
	const onEditSubmit = (editId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: editId,
			estudiante_id: Array.isArray(IdEstudiante) ? null : IdEstudiante,
			docente_id: Array.isArray(Docente) ? null : Docente,
			particular: Particular == '' ? null : Particular,
			telefono: Telefono == '' ? null : Telefono,
			usuario_id: User,
			registro: Registro,
			descripcion: Descripcion,
			tipo: Tipo
			//fecha_entrada: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			//hora_entrada: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
			//fecha_salida: null,
			//hora_salida: null
		});
	};

	function historyBack() {
		setIdEstudiante([]);
		setDocente([]);
		setParticular('');
		setPrograma([]);
		setUser([]);
		setTelefono('');
		setRegistro('');
		setDescripcion('');
		setTipo('Estudiante');
		setMensaje('');
		onChangeIndex(0, '');
	}

	function busqueda(data) {
		if (data.busqueda == 'programa') {
			const item = context.pro.find((opt) => {
				if (opt.id == Programa) info = opt.codigo + '-' + opt.nombre;
				return info;
			});
			return item || {};
		} else if (data.busqueda == 'estudiante') {
			const item = context.est.find((opt) => {
				if (opt.id == IdEstudiante) info = opt.codigo + '-' + opt.nombre;
				return info;
			});
			return item || {};
		} else if (data.busqueda == 'docente') {
			const item = context.doc.find((opt) => {
				if (opt.id == Docente) info = opt.codigo + '-' + opt.nombre;
				return info;
			});
			return item || {};
		}
	}

	const agregarfechayhora = (date) => {
		setFecha(date);
	};

	const tipos = [ { state: 'CC' }, { state: 'TI' } ];

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form}>
					<Grid container spacing={2} style={style.grid}>
						<Grid item md={12} xs={12}>
							<Divider />
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
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Seleccione opción</FormLabel>
								<RadioGroup
									name="Tipo"
									value={Tipo}
									style={style.group}
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
						<Grid item md={6} xs={6}>
							<TextField
								multiline
								type="text"
								value={Descripcion}
								onChange={(event) => {
									setDescripcion(event.target.value);
								}}
								label="Descripción Asesoria"
								fullWidth={true}
							/>
						</Grid>
					</Grid>
					{Tipo == 'Estudiante' ? (
						<Grid container spacing={2}>
							<Grid item md={4} xs={6}>
								<Autocomplete
									value={busqueda({ busqueda: 'programa' })}
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
									renderInput={(params) => <TextField {...params} label="Programa Académico" />}
								/>
							</Grid>
							<Grid item md={4} xs={6}>
								<Autocomplete
									value={busqueda({ busqueda: 'estudiante' })}
									options={context.est}
									onChange={(e, a) => {
										setIdEstudiante(a !== null ? a.id : '');
										setTelefonoEst(a !== null ? a.telefono : '');
									}}
									getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
									renderInput={(params) => (
										<TextField {...params} value={Mensaje} label="Estudiante" />
									)}
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
									value={busqueda({ busqueda: 'docente' })}
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
						<Grid item xs={6} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onEditSubmit}
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

export default EditarTrabajo;
