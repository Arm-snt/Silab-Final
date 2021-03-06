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
		this.readPrestamoElemento();
	}

	//read
	readTodo() {
		axios
			.get('api/prestamo/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	readPrestamoElemento() {
		axios
			.get('api/prestamo/readPrestamoElemento')
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

	createPrestamo(event, data) {
		console.log(data);
		event.preventDefault();
		axios
			.post('api/prestamo/create', data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let data = [ ...this.state.todos ];
					data.push(response.data.todo);
					this.setState({
						todos: data,
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
		console.log(data);
		axios
			.put('api/prestamo/update/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					console.log(response.data.todos);
					todo.estudiante_id = response.data.todo.estudiante_id;
					todo.registro = response.data.todo.registro;
					todo.observacion = response.data.todo.observacion;
					todo.estado = response.data.todo.estado;
					todo.fecha_prestamo = response.data.todo.fecha_prestamo;
					todo.hora_prestamo = response.data.todo.hora_prestamo;
					todo.fecha_entrega = response.data.todo.fecha_entrega;
					todo.hora_entrega = response.data.todo.hora_entrega;

					todo.prestamo_id = response.data.todo.prestamo_id;
					todo.elemento_id = response.data.todo.elemento_id;
					todo.cantidad = response.data.todo.cantidad;
					todo.fecha_prestamo = response.data.todo.fecha_prestamo;
					todo.hora_prestamo = response.data.todo.hora_prestamo;
					todo.fecha_entrega = response.data.todo.fecha_entrega;
					todo.hora_entrega = response.data.todo.hora_entrega;

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

	updatePrestamoEle(data) {
		axios
			.put('api/prestamo/updatePrestamoEle/' + data.prestamo_id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					console.log(response.data.elementospres);
					let elementospre = [ ...this.state.elementospre ];
					let elementospres = elementospre.find((elementospres) => {
						return elementospres.prestamo_id === data.id;
					});
					elementospres.prestamo_id = response.data.elementospres.prestamo_id;
					elementospres.elemento_id = response.data.elementospres.elemento_id;
					elementospres.cantidad = response.data.elementospres.cantidad;
					elementospres.fecha_prestamo = response.data.elementospres.fecha_prestamo;
					elementospres.hora_prestamo = response.data.elementospres.hora_prestamo;
					elementospres.fecha_entrega = response.data.elementospres.fecha_entrega;
					elementospres.hora_entrega = response.data.elementospres.hora_entrega;

					this.setState({
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
			.delete('api/prestamo/delete/' + data.id, data)
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
					createPrestamo: this.createPrestamo.bind(this),
					updatePrestamoEle: this.updatePrestamoEle.bind(this),
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
