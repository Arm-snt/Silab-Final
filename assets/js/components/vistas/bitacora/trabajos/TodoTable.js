import React, { useContext, useState, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
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
	Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Icon from '@mdi/react';
import { mdiCircleEditOutline } from '@mdi/js';
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

function TodoTable() {
	const context = useContext(TodoContext);
	const [ editIsShown, setEditIsShown ] = useState(false);
	const [ editTodoRegistro, setEditTodoRegistro ] = useState('');
	const [ editTodoDescripcion, setEditTodoDescripcion ] = useState('');
	const [ editTodo, setEditTodo ] = useState('');
	const [ deleteConfirmationIsShown, setDeleteConfirmationIsShown ] = useState(false);
	const [ todoToBeDeleted, setTodoToBeDeleted ] = useState(null);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const onEditSubmit = (todoId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: todoId,
			estudiante_id: editTodo,
			registro: editTodoRegistro,
			descripcion: editTodoDescripcion
		});
		setEditIsShown(false);
	};

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
									Descripción
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
										{/*Estduiante*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<Autocomplete
														options={context.est}
														onChange={(e, a) => {
															setEditTodo(a !== null ? a.id : '');
														}}
														getOptionLabel={(option) =>
															option.codigo + ' - ' + option.nombre}
														renderInput={(params) => (
															<TextField {...params} label="Estudiante" />
														)}
													/>
												</form>
											) : (
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.codigo + ' - ' + todo.nombre}
												</Typography>
											)}
										</TableCell>

										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														autoFocus={true}
														value={editTodoRegistro}
														onChange={(event) => {
															setEditTodoRegistro(event.target.value);
														}}
													/>
												</form>
											) : (
												<Typography>{todo.registro}</Typography>
											)}
										</TableCell>
										{/*DESCRIPTION*/}
										<TableCell align="center">
											{editIsShown === todo.id ? (
												<form onSubmit={onEditSubmit.bind(this, todo.id)}>
													<TextField
														type="text"
														value={editTodoDescripcion}
														onChange={(event) => setEditTodoDescripcion(event.target.value)}
													/>
												</form>
											) : (
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.descripcion}
												</Typography>
											)}
										</TableCell>
										<TableCell align="right">
											{editIsShown === todo.id ? (
												<Fragment>
													<IconButton onClick={onEditSubmit.bind(this, todo.id)}>
														<DoneIcon />
													</IconButton>
													<IconButton onClick={() => setEditIsShown(false)}>
														<CloseIcon />
													</IconButton>
												</Fragment>
											) : (
												<Fragment>
													<IconButton
														onClick={() => {
															setEditIsShown(todo.id);
															setEditTodo(todo.estudiante_id);
															setEditTodoRegistro(todo.registro);
															setEditTodoDescripcion(todo.descripcion);
														}}
													>
														<Icon path={mdiCircleEditOutline} size={1} color="red" />
													</IconButton>
													<IconButton
														color="primary"
														aria-label="upload picture"
														component="span"
														onClick={() => {
															setDeleteConfirmationIsShown(true);
															setTodoToBeDeleted(todo);
														}}
													>
														<CancelRounded fontSize="inherit" />
													</IconButton>
												</Fragment>
											)}
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
			{deleteConfirmationIsShown && (
				<DeleteDialog
					todo={todoToBeDeleted}
					open={deleteConfirmationIsShown}
					setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
				/>
			)}
		</Fragment>
	);
}

export default TodoTable;
