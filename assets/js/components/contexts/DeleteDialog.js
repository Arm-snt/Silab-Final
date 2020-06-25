import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { TodoContext } from "./TodoContext";

function DeleteDialog(props) {
  const context = useContext(TodoContext);

  const hide = () => {
    props.setDeleteConfirmationIsShown(false);
  };

  return (
    <Dialog onClose={hide} fullWidth={true} maxWidth="sm" open={props.open}>
      <DialogTitle>¿Dese eliminar este registro?</DialogTitle>
      <DialogContent>{props.todo.name}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancelar</Button>
        <Button
          onClick={() => {
            context.deleteTodo({ id: props.todo.id, name: props.todo.name });
            hide();
          }}
        >
          Eliminar
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
