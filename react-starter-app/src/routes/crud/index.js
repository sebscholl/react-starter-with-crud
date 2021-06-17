/* CRUD EXAMPLES USING APOLLO CLIENT API */
import React from 'react';
import { gql } from '@apollo/client' 

import api from '../../shared/api';

const CREATE_TODO = gql`
  mutation($data: TodoCreateInput!) {
    todoCreate(data: $data) {
      id
      body
    }
  }
`

const GET_TODOS = gql`
  query {
    todosList {
      items {
        id
        body 
      }
    }
  }
`

const UPDATE_TODO = gql`
  mutation($data: TodoUpdateInput!) {
    todoUpdate(data: $data) {
      id
      body
    }
  }
`

const DELETE_TODO = gql`
  mutation($data: TodoDeleteInput!) {
    todoDelete(data: $data) {
      success
    }
  }
`

export default class CRUDexample extends React.Component {

  /* Component constructor */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      editTodo: {},
      newTodo: {}
    };

    /* Bind functions scope */
    this.setTodo = this.setTodo.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.handleNewChange = this.handleNewChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
  }

  /* Setting the todo */
  setTodo (todo) {
    this.setState({ editTodo: todo })
  }

  /* Handle create input change */
  handleNewChange (e) {
    this.setState({ newTodo: {
      body: e.target.value
    }})
  }

  /* Handle edit input change */
  handleEditChange (e) {
    this.setState({ editTodo: {
      id: this.state.editTodo.id,
      body: e.target.value
    }})
  }

  /* Creating a todo */
  async createTodo () {
    const { data: { todoCreate} } = await api.mutate({
      mutation: CREATE_TODO,
      variables: { data: this.state.newTodo }
    })

    /* Add todo to todos */
    this.setState({ 
      newTodo: { body: '' },
      editTodo: { id: null, body: '' },
      todos: this.state.todos.concat([todoCreate])
    })
  }

  /* Updating a todo */
  async updateTodo (todo) {
    const { data: { todoUpdate } } = await api.mutate({
      mutation: UPDATE_TODO,
      variables: { data: this.state.editTodo }
    })

    const index = this.state.todos.findIndex(t => t.id === todoUpdate.id)

    /* Add todo to todos */
    this.setState(prevState => {
      const todos = [...prevState.todos];
      todos[index] = todoUpdate
      return { 
        todos,
        newTodo: { body: '' },
        editTodo: { id: null, body: '' }
      }
    });
  }

  /* Deleteing a todo */
  async deleteTodo ({ id }) {
    await api.mutate({
      mutation: DELETE_TODO,
      variables: { data: { id } }
    })

    const index = this.state.todos.findIndex(t => t.id === id)

    /* Add todo to todos */
    this.setState(prevState => {
      const todos = [...prevState.todos];
      todos.splice(index, 1)
      return { 
        todos
      }
    });
  }

  /* Read the todos */
  async componentDidMount() {
    const { data } = await api.query({ query: GET_TODOS })

    this.setState({ todos: data.todosList.items })
  }  

  render() {
    return (
      <div>
        <h3>User Todos</h3>

        <div>
          {this.state.editTodo.id ? (
            <div>
              <h5>Edit Todo</h5>
              <textarea value={this.state.editTodo.body} onChange={this.handleEditChange}></textarea>
              <button onClick={this.updateTodo} disabled={!this.state.editTodo.id}>Update</button>
            </div>
          ) : (
            <div>
              <h5>Create Todo</h5>
              <textarea value={this.state.newTodo.body} onChange={this.handleNewChange}></textarea>
              <button onClick={this.createTodo}>Create</button>
            </div>
          )}
          
          <ul>
            {this.state.todos.map(todo => (
              <li key={todo.id}>
                {todo.body}
                | <button onClick={() => this.setTodo(todo)}>Edit</button> 
                | <button onClick={() => this.deleteTodo(todo)}>Delete</button> 
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
