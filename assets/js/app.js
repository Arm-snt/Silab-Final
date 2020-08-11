import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import AppNavBar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
import Login from './components/seguridad/Login';
import TabPrestamo from './components/vistas/bitacora/prestamos/TabPrestamo';
import TabEstudiante from './components/seguridad/personas/estudiantes/TabEstudiante';
import TabUsuario from './components/seguridad/usuarios/TabUsuario';
import TabElemento from './components/vistas/almacen/elementos/TabElemento';
import TabLaboratorio from './components/vistas/almacen/laboratorios/TabLaboratorio';
import TabTrabajo from './components/vistas/bitacora/trabajos/TabTrabajo';
import TabMantenimiento from './components/vistas/bitacora/mantenimientos/TabMantenimiento';

function App(props) {
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<AppNavBar />
				<Grid container>
					<Switch>
						<Route path="/auth/login" exact component={Login} />
						<Route path="/elementos" exact component={TabElemento} />
						<Route path="/Prestamos" exact component={TabPrestamo} />
						<Route path="/usuarios" exact component={TabUsuario} />
						<Route path="/Estudiantes" exact component={TabEstudiante} />
						<Route path="/laboratorios" exact component={TabLaboratorio} />
						<Route path="/mantenimientos" exact component={TabMantenimiento} />
						<Route path="/trabajos" exact component={TabTrabajo} />
					</Switch>
				</Grid>
			</MuiThemeProvider>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
