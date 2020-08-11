import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			ele: [],
			est: [],
			elementospre: [],
			message: {}
		};
		this.readTodo();
		this.readElemento();
		this.readEstudiante();
		this.readMantenimientoElemento();
	}

	//read
	readTodo() {
		axios
			.get('api/mantenimiento/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	readMantenimientoElemento() {
		axios
			.get('api/mantenimiento/readMantenimientoElemento')
			.then((response) => {
				this.setState({
					elementospre: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//read
	readElemento() {
		axios
			.get('api/elemento/read')
			.then((response) => {
				this.setState({
					ele: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//read
	readEstudiante() {
		axios
			.get('api/estudiante/read')
			.then((response) => {
				this.setState({
					est: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	createMantenimiento(event, data) {
		event.preventDefault();
		axios
			.post('api/mantenimiento/create', data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					todos.push(response.data.todo);
					todos.sort(function(a,b){
						if(a.fecha_entrega>b.fecha_entrega){
							return 1;
						}
					});
					
					this.setState({
						todos: todos,
						elementospre: response.data.elementospres,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//update
	updateTodo(data) {
		axios
			.put('api/mantenimiento/update/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					console.log(response.data);
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.tipo = response.data.todo.tipo;
					todo.observacion = response.data.todo.observacion;
					todo.estado = response.data.todo.estado;
					todo.fecha_solicitud = response.data.todo.fecha_solicitud;
					todo.hora_solicitud = response.data.todo.hora_solicitud;
					todo.fecha_entrega = response.data.todo.fecha_entrega;
					todo.hora_entrega = response.data.todo.hora_entrega;

					this.setState({
						todos: todos,
						elementospre: response.data.elementospres,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	updateMantenimientoEle(data) {
		axios
			.put('api/mantenimiento/updateMantenimientoEle/' + data.mantenimiento_id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.mantenimiento_id;
					});
					todo.tipo = response.data.todo.tipo;
					todo.observacion = response.data.todo.observacion;
					todo.estado = response.data.todo.estado;
					todo.fecha_solicitud = response.data.todo.fecha_solicitud;
					todo.hora_solicitud = response.data.todo.hora_solicitud;
					todo.fecha_entrega = response.data.todo.fecha_entrega;
					todo.hora_entrega = response.data.todo.hora_entrega;

					let elementospre = [ ...this.state.elementospre ];
					let elementospres = elementospre.find((elementospres) => {
						return elementospres.mantenimiento_id === data.mantenimiento_id && elementospres.elemento_id === data.elemento_id;
					});
					elementospres.mantenimiento_id = response.data.elementospres.mantenimiento_id;
					elementospres.elemento_id = response.data.elementospres.elemento_id;
					elementospres.cantidad = response.data.elementospres.cantidad;
					elementospres.fecha_solicitud = response.data.elementospres.fecha_solicitud;
					elementospres.hora_solicitud = response.data.elementospres.hora_solicitud;
					elementospres.fecha_entrega = response.data.elementospres.fecha_entrega;
					elementospres.hora_entrega = response.data.elementospres.hora_entrega;
					
					
					this.setState({
						todos: todos,
						elementospre: elementospre,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//delete
	deleteTodo(data) {
		console.log(data);
		axios
			.delete('api/mantenimiento/delete/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});

					todos.splice(todos.indexOf(todo), 1);

					this.setState({
						todos: todos,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<TodoContext.Provider
				value={{
					...this.state,
					updateTodo: this.updateTodo.bind(this),
					createMantenimiento: this.createMantenimiento.bind(this),
					updateMantenimientoEle: this.updateMantenimientoEle.bind(this),
					deleteTodo: this.deleteTodo.bind(this),
					setMessage: (message) => this.setState({ message: message })
				}}
			>
				{this.props.children}
			</TodoContext.Provider>
		);
	}
}

export default TodoContextProvider;
