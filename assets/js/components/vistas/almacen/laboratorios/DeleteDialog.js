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

	let titulo = '¿Desea cambiar el elemento de laboratorio?';
	let contenido = 'Esto permitira reasignar el elemento a otro laboratorio: ';
	let nombre = '';
	let update = {};

	if (props.todo.codlaboratorio) {
		titulo = '¿Dese cambiar el estado del laboratorio?';
		let estado = 'Activo';
		contenido = 'Esto permitira inhabilitar o habilitar el acceso al laboratorio: ';
		nombre = props.todo.nombre;
		if (props.todo.estado == estado) {
			estado = 'Inactivo';
		}
		update = {
			id: props.todo.id,
			codlaboratorio: props.todo.codlaboratorio,
			nombre: props.todo.nombre,
			ubicacion: props.todo.ubicacion,
			observacion: props.todo.observacion,
			usuario_id: props.todo.usuario_id,
			estado: estado
		};
	} else {
		nombre = props.todo.elemento;
		update = {
			id: props.todo.id,
			codelemento: props.todo.codelemento,
			elemento: props.todo.elemento,
			laboratorio_id: null,
			stock: props.todo.stock,
			horauso: props.todo.horauso,
			categoria: props.todo.categoria,
			estado: props.todo.estado
		};
	}

	const hide = () => {
		props.setEliminarVisible(false);
	};

	return (
		<Dialog onClose={hide} TransitionComponent={Transicion} fullWidth={true} maxWidth="sm" open={props.open}>
			<DialogTitle>{titulo}</DialogTitle>
			<DialogContent>
				<DialogContentText>{contenido + nombre}</DialogContentText>
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
						if (update.codelemento) {
							context.updateElemento(update);
						} else {
							context.updateTodo(update);
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
