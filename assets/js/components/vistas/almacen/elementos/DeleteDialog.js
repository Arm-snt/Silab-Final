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

  let titulo = '¿Desea cambiar el estado del Elemento?';
  let estado = 'Activo';

  if(props.todo.estado == estado){
    estado ='Inactivo';
  }

  const hide = () => {
    props.setEliminarVisible(false);
  };  

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
      <DialogContentText>{props.todo.elemento}</DialogContentText>
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
							laboratorio_id: props.todo.laboratorio_id,
							elemento: props.todo.elemento,
							codelemento:props.todo.codelemento,
							stock:props.todo.stock,
							horauso:props.todo.horauso,
							categoria:props.todo.categoria,
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
	setEliminarVisible: PropTypes.func.isRequired,
	todo: PropTypes.object
};

export default DeleteDialog;
