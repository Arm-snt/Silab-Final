import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Grid, Link, Typography, IconButton, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Icon from '@mdi/react';
import { mdiFileDocumentEdit, mdiEyeCheck, mdiFileCancel } from '@mdi/js';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { TodoContext } from './TodoContext';
import DeleteDialog from './DeleteDialog';

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
	}
};

function Prestamos(props) {
	const onChangeIndex = props.onChangeIndex;
	const context = useContext(TodoContext);
	//console.log(context.todos);
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ prestamoEliminar, setPrestamoEliminar ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function historyBack() {
		window.history.back();
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

	return (
		<Fragment>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper}>
					<Table style={style.table} aria-label="customized table">
						{/*HEAD*/}
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Estudiante
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Registro
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Observación
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
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										{/*NOMBRE*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.codigo + ' - ' + todo.nombre}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.registro}</Typography>
										</TableCell>
										{/*OBSERVACIÓN*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{todo.observacion}
											</Typography>
										</TableCell>
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.estado}</Typography>
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
														setPrestamoEliminar(todo);
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
				<DeleteDialog todo={prestamoEliminar} open={eliminarVisible} setEliminarVisible={setEliminarVisible} />
			)}
		</Fragment>
	);
}

export default Prestamos;
