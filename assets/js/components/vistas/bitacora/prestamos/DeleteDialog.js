import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Cached, Cancel } from '@material-ui/icons';
import { TodoContext } from './TodoContext';

const Transicion = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog(props) {
	const context = useContext(TodoContext);

	let titulo = '¿Desea cambiar el estado del Préstamo?';
	let estado = 'Activo';

	if (props.todo.estado == estado) {
		estado = 'Inactivo';
	}

	const hide = () => {
		props.setEliminarVisible(false);
	};

	return (
		<Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
			<DialogTitle>{titulo}</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.todo.registro}</DialogContentText>
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
						context.updateTodo({
							id: props.todo.id,
							estudiante_id: props.todo.estudiante_id,
							registro: props.todo.registro,
							observacion: props.todo.observacion,
							estado: estado
						});
						hide();
					}}
				>
					Cambiar
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
