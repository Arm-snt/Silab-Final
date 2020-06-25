import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Typography, TextField, IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiFileDocumentEdit, mdiEyeCheck, mdiFileCancel } from '@mdi/js';
import { Autocomplete } from '@material-ui/lab';
import { CancelRounded } from '@material-ui/icons';
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
	error: {
		marginTop: 20,
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

function Elementos(props) {
	const onChangeIndex = props.onChangeIndex;
	let laboratorio = "";
	const context = useContext(TodoContext);
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ todoEliminar, setTodoEliminar ] = useState(null);
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

	const estado = [ { state: 'Activo' }, { state: 'Inactivo' } ];
	const categoria = [ { state: 'A' }, { state: 'B' }, { state: 'C' } ];

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.todos.length - page * rowsPerPage);

	return (
		<Fragment>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper} style={style.space}>
					<Table style={style.table} aria-label="customized table">
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Código
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Nombre
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Laboratorio
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Stock
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Horas de Uso
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Categoría
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Estado
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Opciones
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{context.todos
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => (
									<TableRow key={'todo ' + index}>
										{/*codigo elemento*/}
										<TableCell align="center">
											<Typography>{todo.codelemento}</Typography>
										</TableCell>
										{/*nombre elemento*/}
										<TableCell align="center">
											<Typography>{todo.elemento}</Typography>
										</TableCell>
										{/*nombre labaratorio*/}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>
												{context.lab.map((res) => {
													if (res.id == todo.laboratorio_id) {
														laboratorio = res.codlaboratorio + "-" +res.nombre 
													}
												})}
												{laboratorio}
											</Typography>
										</TableCell>
										{/*stock elemento*/}
										<TableCell align="center">
											<Typography>{todo.stock}</Typography>
										</TableCell>
										{/*hora de uso*/}
										<TableCell align="center">
											<Typography>{todo.horauso}</Typography>
										</TableCell>
										{/* categoria */}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.categoria}</Typography>
										</TableCell>
										{/* estado */}
										<TableCell align="center">
											<Typography style={{ whiteSpace: 'pre-wrap' }}>{todo.estado}</Typography>
										</TableCell>
										{/* opciones */}
										<TableCell align="right">
											<Fragment>
												<IconButton
													onClick={(e) => {
														onChangeIndex(2, todo, e);
													}}>
													<Icon path={mdiFileDocumentEdit} size={1} color="red" />
												</IconButton>
												<IconButton
													onClick={() => {
													}}>
													<Icon path={mdiEyeCheck} size={1} color="red" />
												</IconButton>
												<IconButton
													onClick={() => {
														setEliminarVisible(true);
														setTodoEliminar(todo);
													}}>
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
				<DeleteDialog todo={todoEliminar} open={eliminarVisible} setEliminarVisible={setEliminarVisible} />
			)}
		</Fragment>
	);
}

export default Elementos;
