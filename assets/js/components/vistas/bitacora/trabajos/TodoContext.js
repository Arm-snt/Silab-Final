import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			est: [],
			lab:[],
			usu:[],
			message: {}
		};
		this.readTodo();
		this.readLaboratorios();
		this.readUsuario();
		this.leer();
	}

	//read
	readTodo() {
		axios
			.get('api/trabajo/read')
			.then((response) => {
				this.setState({
					todos: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	readUsuario() {
		axios
			.get('api/usuario/read')
			.then((response) => {
				this.setState({
					usu: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	readLaboratorios() {
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
	//read
	leer() {
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

	//create
	createTodo(event, todo) {
		event.preventDefault();
		axios
			.post('api/trabajo/create', todo)
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
		axios
			.put('api/trabajo/update/' + data.id, data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let todos = [ ...this.state.todos ];
					let todo = todos.find((todo) => {
						return todo.id === data.id;
					});
					todo.estudiante_id = response.data.todo.estudiante_id;
					todo.registro = response.data.todo.registro;
					todo.descripcion = response.data.todo.descripcion;

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

	//delete
	deleteTodo(data) {
		axios
			.delete('api/trabajo/delete/' + data.id)
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
