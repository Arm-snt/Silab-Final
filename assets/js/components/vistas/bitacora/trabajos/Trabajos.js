import React, { Component } from 'react';
//import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
	InputAdornment
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiEye, mdiCircleEditOutline, mdiCheckboxMarkedCircle, mdiCardSearch } from '@mdi/js';
import HomeIcon from '@material-ui/icons/Home';

const style = {
	table: {
		minWidth: 650,
		paddingTop: '40px'
	},
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	homeIcon: {
		width: 20,
		height: 20,
		marginRight: '4px'
	},
	space: {
		paddingTop: '20px'
	},
	divider: {
		marginBottom: 20
	},
	search: {
		width: 400,
		marginBottom: 20
	}
};

function createData(estudiante, stock, horas_uso, categoria, estado) {
	return { estudiante, stock, horas_uso, categoria, estado };
}

const rows = [
	createData('23546 - Arduino Nano', '12', '20', 'A', 'Activo'),
	createData('35484 - Arduino Mega', '10', '5', 'A', 'Activo'),
	createData('56842 - Tester Hx12', '7', '45', 'B', 'Activo'),
	createData('74325 - Alineador estatio', '13', '100', 'C', 'Desactivado'),
	createData('29886 - Teodolito', '20', '200', 'C', 'Activo'),
	createData('12325 - Osciloscopio', '4', '150', 'C', 'Activo')
];

function searchingFor(term) {
	return function(x) {
		return (
			x.estudiante.toLowerCase().includes(term.toLowerCase()) ||
			x.stock.toLowerCase().includes(term.toLowerCase()) ||
			x.horas_uso.toLowerCase().includes(term.toLowerCase()) ||
			x.categoria.toLowerCase().includes(term.toLowerCase()) ||
			x.estado.toLowerCase().includes(term.toLowerCase()) ||
			!term
		);
	};
}

export default class Trabajos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: rows,
			term: ''
		};
		this.searchHandler = this.searchHandler.bind(this);
	}
	searchHandler(event) {
		this.setState({ term: event.target.value });
	}

	render() {
		const { term, rows } = this.state;

		return (
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<Paper style={style.paper}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12}>
							<Breadcrumbs aria-label="breadcrumb">
								<Link color="inherit" style={style.link} href="">
									<HomeIcon style={style.homeIcon} />
									Trabajos
								</Link>
								<Link color="inherit" style={style.link} href="/trabajo/nuevo">
									<Typography color="textPrimary">Nuevo Trabajo</Typography>
								</Link>
							</Breadcrumbs>
						</Grid>
						<Grid item md={12} xs={12}>
							<Divider style={style.divider} />
						</Grid>
					</Grid>

					<div className="App">
						<form>
							<TextField
								fullWidth
								placeholder="Buscar..."
								onChange={this.searchHandler}
								value={term}
								style={style.search}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Icon path={mdiCardSearch} size={1.5} color="red" />
										</InputAdornment>
									)
								}}
							/>
						</form>
					</div>

					<TableContainer component={Paper} style={style.space}>
						<Table style={style.table} aria-label="customized table">
							<TableHead>
								<TableRow>
									<TableCell align="center">Estudiante</TableCell>
									<TableCell align="center">Asignatura - Carrera</TableCell>
									<TableCell align="center">Descripción</TableCell>
									<TableCell align="center">Registardo por</TableCell>
									<TableCell align="center">Entrada</TableCell>
									<TableCell align="center">Salida</TableCell>
									<TableCell align="center">Opciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.filter(searchingFor(term)).map((person) => (
									<TableRow key={person.estudiante}>
										<TableCell component="th" scope="row" align="left">
											{person.estudiante}
										</TableCell>
										<TableCell align="center">{person.stock}</TableCell>
										<TableCell align="center">{person.horas_uso}</TableCell>
										<TableCell align="center">{person.estado}</TableCell>
										<TableCell align="center">{person.categoria}</TableCell>
										<TableCell align="center">{person.stock}</TableCell>
										<TableCell align="center">
											<IconButton>
												<Icon path={mdiEye} size={1} color="red" />
											</IconButton>
											<IconButton>
												<Icon path={mdiCircleEditOutline} size={1} color="red" />
											</IconButton>
											<IconButton>
												<Icon path={mdiCheckboxMarkedCircle} size={1} color="red" />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		);
	}
}
