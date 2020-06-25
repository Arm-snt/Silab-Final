import React, { Component } from 'react';
import { Toolbar, Typography, Button, IconButton, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
//import { MenuDerecha } from "./menuDerecha";
import { MenuDerecha } from './menuDerecha';
//import { MenuIzquierda } from "./menuIzquierda";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Menu, Mail, MoreVert } from '@material-ui/icons';

const styles = (theme) => ({
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	grow: {
		flexGrow: 1
	},
	avatarSize: {
		width: 40,
		height: 40
	},
	listItemText: {
		fontSize: '14px',
		fontWeight: 200,
		paddingLeft: '5px',
		color: '#212121'
	},
	list: {
		width: 200
	}
});

class BarSession extends Component {
	state = {
		right: false,
		left: false
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
  };
  

	render() {
		const { classes } = this.props;
		let textoUsuario = '@aldemarpp';

		return (
			<div>
				<Drawer open={this.state.right} onClose={this.toggleDrawer('right', false)} anchor="right">
					<div
						role="button"
						onClick={
							this.toggleDrawer('right', false)
						}
						onKeyDown={this.toggleDrawer('right', false)}
					>
						<MenuDerecha classes={classes} textoUsuario={textoUsuario} salirSesion="Cerrar Sesion" />
					</div>
				</Drawer>

				<Toolbar>
					<Typography variant="h6">Silab</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton color="inherit" component={Link} to="/inmueble/editar">
							<Mail />
						</IconButton>
						<Button color="inherit">
							Salir
						</Button>
						<Button color="inherit">{textoUsuario}</Button>

						<IconButton
							color="inherit"
							onClick={
								this.toggleDrawer('right', true)
							}
						>
							<Menu />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							color="inherit"
							onClick={
								this.toggleDrawer('right', true)
							}
						>
							<MoreVert />
						</IconButton>
					</div>
				</Toolbar>
			</div>
		);
	}
}

export default compose(withRouter, withStyles(styles))(BarSession);
