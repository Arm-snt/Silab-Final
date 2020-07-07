import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { Cached, Cancel } from '@material-ui/icons';
import { TodoContext } from './TodoContext';

const Transicion = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog(props) {
	const context = useContext(TodoContext);

	let titulo = '¿Desea entregar el elemento del Préstamo?';
	let elenombre = props.todo.elemento;
	let contenido = 'El siguiente elemento será devuelto al stock: ' + elenombre + ' ';
	let update = {};

	if (props.todo.estudiante_id) {
		titulo = '¿Desea cambiar el estado del Préstamo?';
		let estado = 'Activo';
		let nombre = props.todo.nombre;
		contenido = 'El estado del Préstamo realizado a  ' + nombre + ' cambiará! ';
		if (props.todo.estado == estado) {
			estado = 'Inactivo';
		}
		update = {
			id: props.todo.id,
			estudiante_id: props.todo.estudiante_id,
			registro: props.todo.registro,
			observacion: props.todo.observacion,
			estado: estado,
			elemento_id: [],
			fecha_prestamo: props.todo.fecha_prestamo,
			hora_prestamo: props.todo.hora_prestamo,
			fecha_entrega: props.todo.fecha_entrega,
			hora_entrega: props.todo.hora_entrega
		};
	} else {
		update = {
			elemento_id: props.todo.elemento_id,
			prestamo_id: props.todo.prestamo_id,
			codelemento: props.todo.codelemento,
			elemento: props.todo.elemento,
			cantidad: props.todo.cantidad,
			stock: props.todo.stock,
			fecha_prestamo: props.todo.fecha_prestamo,
			hora_prestamo: props.todo.hora_prestamo,
			fecha_entrega: props.todo.fecha_entrega,
			hora_entrega: props.todo.hora_entrega
		};
	}
	const hide = () => {
		props.setEliminarVisible(false);
		props.setEntregar(false);
	};

	return (
		<Dialog onClose={hide} TransitionComponent={Transicion} fullWidth={true} maxWidth="sm" open={props.open}>
			<DialogTitle>{titulo}</DialogTitle>
			<DialogContent>
				<DialogContentText>{contenido}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="secondary" size="small" startIcon={<Cancel />} onClick={hide}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					color="primary"
					size="small"
					endIcon={<Cached />}
					autoFocus
					onClick={() => {
						if (update.estudiante_id) {
							context.updateTodo(update);
						} else {
							if (props.entregar === true) {
								context.updatePrestamoEle(Object.assign(update, { entregar: 'Si' }));
							} else {
								context.updatePrestamoEle(Object.assign(update, { entregar: 'No' }));
							}
						}
						hide();
					}}
				>
					cambiar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

DeleteDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	setEliminarVisible: PropTypes.func.isRequired,
	todo: PropTypes.object
};

export default DeleteDialog;
