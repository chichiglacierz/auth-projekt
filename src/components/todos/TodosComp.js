import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import axios from "axios";
function TodosComp() {
  const navigate = useNavigate();
  const [todos, SetTodos] = useState([]);
  const [todo, SetTodo] = useState("");
  const [todoEditing, SetTodoEditing] = useState(null);
  const [todoTextEditing, SetTodoTextEditing] = useState("");
  const [isRendered, SetIsRendered] = useState(false);

  const fetchData = () => {
    SetIsRendered(true);
    axios("/todo")
      .then((results) => {
        console.log(results);
        console.log(results.data.todos);
        SetTodos(results.data.todos);
      })
      .catch((error) => {
        navigate("/login");
      });
    return () => {
      SetIsRendered(false);
    };
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { title: todo };
    await axios
      .post(`/todo/new/`, newTodo)
      .then((response) => {
        if (response.status === 201) {
          SetTodo("");
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  const editTodo = async (id) => {
    if (todoTextEditing === "") {
      return false;
    }
    const newTodo = { title: todoTextEditing };
    await axios
      .patch(`/todo/${id}`, newTodo)
      .then((response) => {
        SetTodoTextEditing("");
        SetTodoEditing(null);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = async (todoId) => {
    await axios.delete(`/todo/${todoId}`);
    fetchData();
  };
  const logout = async () => {
    await axios.get(`/logout`);
    navigate("/login");
  };
  return (
    <div>
      <div className="todoapp stack-large">
        <button onClick={logout}> log out </button>
        <h1>Missions</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="new-todo-input"
            className="input input__lg"
            label="Todo"
            name="todo"
            type="text"
            onChange={(e) => SetTodo(e.target.value)}
            value={todo}
          />

          <button type="submit" className="btn btn__primary btn__lg">
            Add
          </button>
        </form>
        {todos.map((item) => {
          return (
            <li key={item._id} className="todo stack-small">
              <div className="btn-group">
                {todoEditing === item._id ? (
                  <input
                    type="text"
                    onChange={(e) => SetTodoTextEditing(e.target.value)}
                    value={todoTextEditing}
                  />
                ) : (
                  <div>
                    <label className="todo-label">{item.title}</label>
                  </div>
                )}

                {todoEditing === item._id ? (
                  <button
                    onClick={() => editTodo(item._id)}
                    type="submit"
                    className="btn"
                  >
                    Submit <span className="visually-hidden"></span>
                  </button>
                ) : (
                  <button
                    onClick={() => SetTodoEditing(item._id)}
                    type="button"
                    className="btn"
                  >
                    Edit <span className="visually-hidden"></span>
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(item._id)}
                  type="submit"
                  className="btn btn__danger"
                >
                  Done <span className="visually-hidden"></span>
                </button>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default TodosComp;
