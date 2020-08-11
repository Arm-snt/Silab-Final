import React, { useContext, useState } from 'react';
import { Container, Divider, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TodoContext } from './TodoContext';
import { Save, Send, Cancel } from '@material-ui/icons';
import TablaElementos from './TablaElementos';

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

function EditarPrestamo(data) {
	const context = useContext(TodoContext);
	const [ editId, seteditId ] = useState(data['data'].id);
	const [ editEstudiante_id, seteditEstudiante_id ] = useState(data['data'].estudiante_id);
	const [ editregistro, seteditregistro ] = useState(data['data'].registro);
	const [ editObservacion, seteditObservacion ] = useState(data['data'].observacion);
	const [ editEstado, seteditEstado ] = useState(data['data'].estado);
	const [ cantidad, setcantidad ] = useState('');
	const [ Stock, setStock ] = useState('');
	const [ fecha, setFecha ] = useState(new Date());
	const [ editElemento, seteditElemento ] = useState('');
	const [ editElementop, seteditElementop ] = useState([]);
	const [error, seterror ] = useState({registro:false,cantidad:false,observacion:false});
	const [textoAyuda, settextoAyuda ]= useState({registro:'',cantidad:'',observacion:''})
	let datosE = [];

	const onEditSubmit = (editId, event) => {
		event.preventDefault();
		context.updateTodo({
			id: editId,
			estudiante_id: editEstudiante_id,
			registro: editregistro,
			observacion: editObservacion,
			estado: editEstado,
			elemento_id: editElementop,
			fecha_prestamo: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			hora_prestamo: fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
			fecha_entrega: null,
			hora_entrega: null
		});
		seteditElementop([]);
	};

	context.elementospre.map((res) => {
		if (res.prestamo_id == editId) {
			datosE.push(res);
		}
	});

	function cargar() {
		let a = true;
		datosE.map((res) => {
			if (res.prestamo_id == editId && res.elemento_id == editElemento) {
				a = false;
				return ( a,
						context.setMessage({
						level:'error',
						text: ['El elemento que intenta cargar ya se encuentra en el Prestamo']
					}))
			}
		});
		if (a) {
			if(Stock>cantidad){			
				editElementop.push({
					editElemento,
					cantidad
				});
				seteditElemento('');
				setcantidad('');
				setStock('');
			}else{
				context.setMessage({
					level:'error',
					text: ['La cantidad solicitada del elemento supera el stock disponible!']
				});
				seteditElemento('');
				setcantidad('');
				setStock('');
			}
		}
	}

	function historyBack() {
		window.history.back();
	}

	const estado = [ { state: 'Activo' }, { state: 'Inactivo' } ];

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			<Paper style={style.paper}>
				<form style={style.form} onSubmit={onEditSubmit.bind(this, editId)}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={6}>
							<Autocomplete
								options={context.est}
								onChange={(e, a) => {
									seteditEstudiante_id(a !== null ? a.id : '');
								}}
								getOptionLabel={(option) => option.codigo + '-' + option.nombre}
								renderInput={(params) => <TextField {...params} label="Estudiante" />}
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								error={error.registro}
								type="text"
								value={editregistro}
								onChange={(event) => {
									seteditregistro(event.target.value);
									console.log(error)
									if(editregistro.length<25 && editObservacion.match(/^\w+([\.-]?\w+)*@ufpso.edu.co+$/)){
										error.registro=true;
										textoAyuda.registro='Utilice un correo institucional';
										seterror(error);
										settextoAyuda(textoAyuda);
									}else{
										error.registro=false;
										textoAyuda.registro='';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.registro}
								fullWidth={true}
								label="Registrado Por:"
							/>
						</Grid>
						<Grid item md={6} xs={6}>
							<TextField
								type="text"
								error={error.observacion}
								value={editObservacion}
								onChange={(event) => {
									seteditObservacion(event.target.value);
									if(editObservacion.length<14){
										error.observacion=true;
										textoAyuda.observacion='Minimo 8 caracteres';
										seterror(error);
										settextoAyuda(textoAyuda);
									}else{
										error.observacion=true;
										textoAyuda.observacion='';
										seterror(error);
										settextoAyuda(textoAyuda);
									}
								}}
								helperText={textoAyuda.observacion}
								fullWidth={true}
								label="Observaciones"
							/>
						</Grid>
						<Grid item xs={6} md={2}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="medium"
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
								size="medium"
								color="secondary"
								style={style.submit}
								onClick={historyBack}
								startIcon={<Cancel />}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
					{editEstado == 'Activo' ? (
						<Grid container spacing={2} style={style.grid}>
							<Grid item md={12} xs={12}>
								<Divider />
							</Grid>
							<Grid item xs={4} md={4}>
								<Autocomplete
									options={context.ele}
									onChange={(e, a) => {
										seteditElemento(a !== null ? a.id : '');
										setStock(a !== null ? a.stock : '');
									}}
									getOptionLabel={(option) => option.codelemento + '-' + option.elemento}
									renderInput={(params) => <TextField {...params} label="Cargar Elementos" />}
								/>
							</Grid>
							<Grid item xs={4} md={3}>
								<TextField
									disabled
									type="number"
									fullWidth
									value={Stock}
									label="Stock"
									style={{ whiteSpace: 'pre-wrap' }}
								/>
							</Grid>
							<Grid item xs={4} md={3}>
								<TextField
									type="number"
									fullWidth
									error={error.cantidad}
									value={cantidad}
									onChange={(event) => {
										setcantidad(event.target.value);
										if(cantidad.length>1){
											error.cantidad=true;
											textoAyuda.cantidad='La cantidad debe ser de 2 digitos';
											seterror(error);
											settextoAyuda(textoAyuda);
										}else{
											error.cantidad=true;
											textoAyuda.cantidad='';
											seterror(error);
											settextoAyuda(textoAyuda);
										}										
									}}
									helperText={textoAyuda.cantidad}
									label="Cantidad Solicitada"
									style={{ whiteSpace: 'pre-wrap' }}
								/>
							</Grid>
							<Grid item xs={3} md={2}>
								<Button
									variant="contained"
									fullWidth
									size="small"
									color="primary"
									style={style.submit}
									endIcon={<Send />}
									onClick={() => {
										cargar();
									}}
								>
									Cargar
								</Button>
							</Grid>
							<Grid item md={12} xs={12}>
								<Divider />
							</Grid>
						</Grid>
					) : (
						<Grid item md={12} xs={12}>
							<Divider />
						</Grid>
					)}
					<TablaElementos data={editId} elemento={editElementop} />
				</form>
			</Paper>
		</Container>
	);
}

export default EditarPrestamo;
