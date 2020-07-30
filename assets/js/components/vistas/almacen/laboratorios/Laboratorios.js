import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Grid, Link, Typography, IconButton, TextField, InputAdornment } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiFileDocumentEdit, mdiEyeCheck, mdiFileCancel, mdiCardSearch } from '@mdi/js';
import { TodoContext } from './TodoContext';
import DeleteDialog from './DeleteDialog';

const style = {
	table: {
		minWidth: 500,
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
	divider: {
		marginBottom: 20
	},
	search: {
		width: 400,
		marginBottom: 20
	},
	tableHead: {
		color: '#ffffff',
		backgroundColor: '#E2001A'
	},
	tableCell: {
		color: '#ffffff'
	},
	estado: {
		color: '#28B463'
	}
};

function Laboratorios(props) {
	const onChangeIndex = props.onChangeIndex;
	const context = useContext(TodoContext);
	let Laboratorista = '';
	let filtro = {};
	const [ termino, setTermino ] = useState('');
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ laboratorioEliminar, setLaboratorioEliminar ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function busqueda(termino) {
		return function(filtro) {
			return (
				filtro.codlaboratorio.toString().includes(termino.toLowerCase()) || 
				filtro.nombre.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.ubicacion.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.observacion.toLowerCase().includes(termino.toLowerCase()) ||
				filtro.estado.toLowerCase().includes(termino.toLowerCase()) ||
				!termino
			);
		};
	}

	function historyBack() {
		window.history.back();
	}
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

	return (
		<Fragment>
			<TextField
				fullWidth
				placeholder="Buscar..."
				onChange={(event) => {
					setTermino(event.target.value);
				}}
				value={termino}
				style={style.search}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Icon path={mdiCardSearch} size={1.5} color="red" />
						</InputAdornment>
					)
				}}
			/>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper}>
					<Table style={style.table} aria-label="customized table">
						{/*HEAD*/}
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Laboratorio
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Ubicación
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Observación
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Laboratorista
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Estado
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Opciones
								</TableCell>
							</TableRow>
						</TableHead>
						{/*BODY*/}
						<TableBody>
							{context.todos
								.filter(busqueda(termino))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.codlaboratorio + ' - ' + todo.nombre}
											</Typography>
										</TableCell>
										{/*UBICACIÓN*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.ubicacion}</Typography>
										</TableCell>
										{/*OBSERVACIÓN*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.observacion}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{context.usu.map((res) => {
													if (res.id == todo.usuario_id) {
														Laboratorista = res.codusuario + '-' + res.usuario;
													}
												})}
												{Laboratorista}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={todo.estado === 'Activo' ? style.estado : null}>
												{todo.estado}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Fragment>
												<IconButton
													onClick={(e) => {
														onChangeIndex(2, todo, e);
													}}
												>
													<Icon path={mdiFileDocumentEdit} size={1} color="red" />
												</IconButton>
												<IconButton
													onClick={(e) => {
														onChangeIndex(3, todo, e);
													}}
												>
													<Icon path={mdiEyeCheck} size={1} color="red" />
												</IconButton>
												<IconButton
													onClick={() => {
														setEliminarVisible(true);
														setLaboratorioEliminar(todo);
													}}
												>
													<Icon path={mdiFileCancel} size={1} color="gray" />
												</IconButton>
											</Fragment>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={context.todos.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
			{eliminarVisible && (
				<DeleteDialog
					todo={laboratorioEliminar}
					open={eliminarVisible}
					setEliminarVisible={setEliminarVisible}
				/>
			)}
		</Fragment>
	);
}

export default Laboratorios;
