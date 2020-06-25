import React, { useContext, useState, Fragment } from 'react';
import { Container, Paper, Grid,Breadcrumbs, Link, Typography, TextField, IconButton, Divider, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
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
	const [ addLaboratorio, setAddLaboratorio ] = useState('');
	const [ addUsuario, setAddUsuario ] = useState('');
	const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
	const [ addFecha, setAddFecha ] = useState('');
	const [ addHora, setAddHora ] = useState('');
	const [ adddep, setAddDep ] = useState('d');
	const [ addTodoDescripcion, setAddTodoDescripcion ] = useState('');
	const [ addTodo, setAddTodo ] = useState('');

	const onCreateSubmit = (event) => {
		event.preventDefault();
		context.createTodo(event, {
			estudiante_id: addTodo,
			registro: addUsuario,
			descripcion: addTodoDescripcion
		});
		setAddTodo('');
		setAddTodoRegistro('');
		setAddTodoDescripcion('');
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	  };

	const contextdept = 
		[{ id: 1, coddepartamento: 658875, departamento: "Departamento de Sistemas e Informática" },
		{ id: 2, coddepartamento: 655673, departamento: "Departamento de Ingeniería Civil" },
		{ id: 3, coddepartamento: 668035, departamento: "Departamento de Ingeniería Mecánica" }];
	
		const contextasig = 
		[{ id: 1, codasignatura: 342875, asignatura: "Fisica General" },
		{ id: 2, codasignatura: 345373, asignatura: "Electronica General" },
		{ id: 3, codasignatura: 348035, asignatura: "Ondas y Particulas" }];

		const contextpro = 
		[{ id: 1, codprograma: 560675, programa: "Ingeniería de Sistemas" },
		{ id: 2, codprograma: 560373, programa: "Ingeniería Civil" },
		{ id: 3, codprograma: 560135, programa: "Ingeniería Mecánica" }];

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
								options={context.lab}
								onChange={(e, a) => {
									setAddLaboratorio(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codlaboratorio + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Laboratorio" />}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={contextdept}
								onChange={(e, a) => {
									setAddLaboratorio(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.coddepartamento + '-' + option.departamento}
								renderInput={(params) => <TextField {...params} label="Departamento" />}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options={context.usu}
								onChange={(e, a) => {
									setAddUsuario(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codusuario + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Coordinador Laboratorio" />}
							/>
						</Grid>
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6} direction="row">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Fecha Entrada"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item md={4} xs={6} direction="row">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardTimePicker
								margin="normal"
								id="time-picker"
								label="Hora Entrada"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change time',
								}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item md={4} xs={6}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Seleccione opción</FormLabel>
								<RadioGroup name="dep" value={adddep} onChange={(event) => {
									setAddDep(event.target.value);
									}}>
									<FormControlLabel value="d" control={<Radio color="primary"/>} label="D" labelPlacement="start"/>
									<FormControlLabel value="e" control={<Radio color="primary"/>} label="E" labelPlacement="start"/>
									<FormControlLabel value="p" control={<Radio color="primary"/>} label="P" labelPlacement="start"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={context.est}
								onChange={(e, a) => {
									setAddTodo(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codigo + ' - ' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Estudiante" />}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={contextpro}
								onChange={(e, a) => {
									setAddTodo(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codprograma + ' - ' + option.programa}
								renderInput={(params) => <TextField {...params} label="Programa" />}
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={contextasig}
								onChange={(e, a) => {
									setAddTodo(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codasignatura + ' - ' + option.asignatura}
								renderInput={(params) => <TextField {...params} label="Asignatura" />}
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={addTodoDescripcion}
								onChange={(event) => {
									setAddTodoDescripcion(event.target.value);
								}}
								label="Descripción Asesoria"
								fullWidth={true}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
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
