import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Grid, Paper, Typography, IconButton, TextField, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
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
	form: {
		width: '100%'
	},
	submit: {
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

function TablaElementosCreate({ elemento }) {
	console.log(elemento);
	let elementoids = [];
	elemento.forEach((elementos) => {
		elementoids.push(elementos.editElemento);
	});
	const context = useContext(TodoContext);
	const elementoscarga = [ ...new Set(elementoids) ];
	let datosE = [];
	let nuevosE = [];
	let cantidad = '';
	let check = false;
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ elementosDelete, setElementosDelete ] = useState([]);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	context.ele.map((res) => {
		elementoscarga.forEach((elementoscarga) => {
			if (res.id == elementoscarga) {
				elemento.forEach((elementos) => {
					if (elementos.editElemento == elementoscarga && res.stock >= elementos.cantidad) {
						cantidad = elementos.cantidad;
						check = true;
					}
				});
				if (check) {
					nuevosE.push(Object.assign(res, { cantidad: cantidad }));
					cantidad = '';
					check = false;
				}
			}
		});
	});

	for (var index = 0; index < nuevosE.length; index++) {
		datosE.push(nuevosE[index]);
	}

	function eliminar(elementosDelete) {
		setEliminarVisible(true);
	}

	useEffect(
		() => {
			datosE.splice(datosE.indexOf(elementosDelete), 1);
		},
		[ datosE ]
	);

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

	return (
		<Fragment>
			<Container style={style.container} component="main" maxWidth="lg" justify="center">
				<TableContainer component={Paper}>
					<Table style={style.table} aria-label="customized table">
						{/*HEAD*/}
						<TableHead style={style.tableHead}>
							<TableRow>
								<TableCell style={style.tableCell} align="center">
									Elementos
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Cantidad Solicitada
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Acciones
								</TableCell>
							</TableRow>
						</TableHead>
						{/*BODY*/}
						<TableBody>
							{datosE
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => {
									return (
										<TableRow key={'todo ' + index}>
											<TableCell align="center">
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.codelemento + ' - ' + todo.elemento}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.cantidad}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Fragment>
													<IconButton
														color="primary"
														aria-label="upload picture"
														component="span"
														onClick={() => {
															setElementosDelete(todo); //solo eliminar con un splice
															eliminar();
														}}
													>
														<Delete fontSize="inherit" />
													</IconButton>
												</Fragment>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={datosE.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
			{eliminarVisible && (
				<DeleteDialog todo={elementosDelete} open={eliminarVisible} setEliminarVisible={setEliminarVisible} />
			)}
		</Fragment>
	);
}

export default TablaElementosCreate;
