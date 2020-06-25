import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiTestTube,
  mdiAccountBox,
  mdiBookSearch,
  mdiFlask,
  mdiTools,
  mdiBriefcase,
  mdiMessageBulleted,
  mdiAccountGroup,
  mdiAccountKey,
  mdiAccountArrowLeft
} from "@mdi/js";
import { Link } from "react-router-dom";

export const MenuDerecha2 = ({ classes, textoUsuario, fotoUsuario }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} to="/auth/perfil">
        <Avatar src={fotoUsuario} />
        <ListItemText
          classes={{ primary: classes.ListItemText }}
          primary={textoUsuario}
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="/auth/perfil">
        <Icon path={mdiAccountBox} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Perfil"
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="/elementos">
        <Icon path={mdiTestTube} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Elementos"
        />
      </ListItem>
      <ListItem component={Link} button to="/laboratorios">
        <Icon path={mdiFlask} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Laboratorios"
        />
      </ListItem>
      <ListItem component={Link} button to="/mantenimientos">
        <Icon path={mdiTools} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Mantenimientos"
        />
      </ListItem>
      <ListItem component={Link} button to="/">
        <Icon path={mdiMessageBulleted} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Mensajes"
        />
      </ListItem>
      <ListItem component={Link} button to="/usuarios">
        <Icon path={mdiAccountKey} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Usuarios"
        />
      </ListItem>
      <Divider />
      <ListItem component={Link} button to="Cerrar Sesión">
        <Icon path={mdiAccountArrowLeft} size={1} color="red" />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Cerrar Sesión"
        />
      </ListItem>
    </List>
  </div>
);
