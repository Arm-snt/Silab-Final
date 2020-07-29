import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			lab: [],
			message: {}
		};
		this.readTodo();
		this.readLaboratorio();
	}

	//Leer
	readTodo() {
		axios
			.get('api/elemento/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//Leer
	readLaboratorio() {
		axios
			.get('api/laboratorio/read')
			.then((response) => {
				this.setState({
					lab: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	//Crear
	createTodo(event, todo) {
		event.preventDefault();
		axios
			.post('api/elemento/create', todo)
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

	//Actualizar
	updateTodo(data) {
		axios
			.put('api/elemento/update/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					console.log(data.id, data);
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.codelemento = response.data.todo.codelemento;
					todo.laboratorio_id = response.data.todo.laboratorio_id;
					todo.elemento = response.data.todo.elemento;
					todo.stock = response.data.todo.stock;
					todo.horauso = response.data.todo.horauso;
					todo.categoria = response.data.todo.categoria;
					todo.estado = response.data.todo.estado;

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

	//Eliminar
	deleteTodo(data) {
		axios
			.delete('api/elemento/delete/' + data.id)
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
					createTodo: this.createTodo.bind(this),
					updateTodo: this.updateTodo.bind(this),
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
