import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import { Container, Paper, Typography, IconButton, Button } from '@material-ui/core';
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

function TablaLaboratiorios({ data, laboratorio }) {
	const context = useContext(TodoContext);
	const laboratorioscarga = [ ...new Set(laboratorio) ];
	let datosL = [];
	let nuevosL = [];
	const [ eliminarVisible, setEliminarVisible ] = useState(false);
	const [ laboratoriosDelete, setlaboratoriosDelete ] = useState([]);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	context.lab.map((res) => {
		//console.log(res.usuario_id)
		if (res.usuario_id == data) {
			datosL.push(res);
		}
	});

	context.lab.map((res) => {
		laboratorioscarga.forEach((laboratorioscarga) => {
			if (res.id == laboratorioscarga) {
				nuevosL.push(res);
			}
		});
	});

	for (var index = 0; index < nuevosL.length; index++) {
		datosL.push(nuevosL[index]);
	}

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
									Codigo
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Laboratorio
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Ubicación
								</TableCell>
								<TableCell style={style.tableCell} align="center">
									Acciones
								</TableCell>
							</TableRow>
						</TableHead>
						{/*BODY*/}
						<TableBody>
							{datosL
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.reverse()
								.map((todo, index) => {
									return (
										<TableRow key={'todo ' + index}>
											<TableCell align="center">
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.codlaboratorio}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.nombre}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Typography style={{ whiteSpace: 'pre-wrap' }}>
													{todo.ubicacion}
												</Typography>
											</TableCell>
											<TableCell align="center">
												<Fragment>
													<IconButton
														color="primary"
														aria-label="upload picture"
														component="span"
														onClick={() => {
															setEliminarVisible(true);
															setlaboratoriosDelete(todo);
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
					count={datosL.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
			{eliminarVisible && (
				<DeleteDialog
					todo={laboratoriosDelete}
					open={eliminarVisible}
					setEliminarVisible={setEliminarVisible}
				/>
			)}
		</Fragment>
	);
}

export default TablaLaboratiorios;
