import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button,} from "@material-ui/core";
import { Cached, Cancel } from '@material-ui/icons';
import { TodoContext } from "./TodoContext";

const Transicion = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialog(props) {
  const context = useContext(TodoContext);

  let titulo = '¿Desea cambiar el estado del Estudiante?';
  let estado = 'Activo';

  if(props.todo.estado == estado){
    estado ='Inactivo';
  }

  const hide = () => {
    props.setDeleteConfirmationIsShown(false);
  };  

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
      <DialogContentText>{props.todo.nombre}</DialogContentText>
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
							codigo: props.todo.codigo,
							nombre: props.todo.nombre,
							programa_id:props.todo.programa_id,
							email:props.todo.email,
							tipodoc:props.todo.tipodoc,
							documento:props.todo.documento,
							telefono:props.todo.telefono,
							estado: estado,
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
	setDeleteConfirmationIsShown: PropTypes.func.isRequired,
	todo: PropTypes.object
};

export default DeleteDialog;
