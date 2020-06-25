import React, { useContext, useState } from 'react';
import { Container, Divider, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
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
	}
};

function EditarElemento(data) {
	const context = useContext(TodoContext);
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ editarCodElemento, seteditarCodElemento ] = useState(data['data'].codelemento);
	const [ editarElemento, seteditarElemento ] = useState(data['data'].elemento);
	const [ editarLaboratorioid, seteditarLaboratorioid ] = useState(data['data'].laboratorio_id);
	const [ editarStock, seteditarStock ] = useState(data['data'].stock);
	const [ editarHoraUso, seteditarHoraUso ] = useState(data['data'].horauso);
	const [ editarCategoria, seteditarCategoria ] = useState(data['data'].categoria);
	const [ editarEstado, seteditarEstado ] = useState(data['data'].estado);

	const onEditSubmit = (editId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: editId,
			codelemento: editarCodElemento,
			elemento: editarElemento,
			laboratorio_id: editarLaboratorioid,
			stock: editarStock,
			horauso: editarHoraUso,
			categoria: editarCategoria,
			estado: editarEstado
		});
	};

	
	const estado = [{ state: "Activo" }, { state: "Inactivo" }];
	const categoria = [{ state: "A" }, { state: "B" }, { state: "C" }];

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form} onSubmit={onEditSubmit.bind(this, editId)}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editarCodElemento}
								onChange={(event) => {
									seteditarCodElemento(event.target.value);
								}}
								fullWidth={true}
								label="Código Elemento"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editarElemento}
								onChange={(event) => {
									seteditarElemento(event.target.value);
								}}
								fullWidth={true}
								label="Nombre Elemento"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={context.lab}
								onChange={(e, a) => {
									seteditarLaboratorioid(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codlaboratorio + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Laboratorio" />}
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editarStock}
								onChange={(event) => {
									seteditarStock(event.target.value);
								}}
								fullWidth={true}
								label="Stock"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								value={editarHoraUso}
								onChange={(event) => {
									seteditarHoraUso(event.target.value);
								}}
								fullWidth={true}
								label="Horas de uso"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={categoria}
								onChange={(e, a) => {
									seteditarCategoria(a !== null ? a.state : '');
								}}
								getOptionLabel={(option) => option.state}
								renderInput={(params) => <TextField {...params} label="Categoria" />}
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={estado}
								onChange={(e, a) => {
									seteditarEstado(a !== null ? a.state : '');
								}}
								getOptionLabel={(option) => option.state}
								renderInput={(params) => <TextField {...params} label="Estado" />}
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="small"
								color="primary"
								style={style.submit}
								endIcon={<Save />}
							>
								Guardar
							</Button>
						</Grid>
						<Grid item xs={2} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="small"
								color="secondary"
								style={style.submit}
								onClick={historyBack}
								startIcon={<Cancel />}
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

export default EditarElemento;
