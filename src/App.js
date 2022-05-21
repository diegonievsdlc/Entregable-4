import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";

function App() {
  const [users, setUsers] = useState([]);
  const [modalForm, setModalForm] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [userDeleted, setUserDeleted] = useState("");
  const [usernameSelected, setUsernameSelected] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };
  const showAndHideModal = () => {
    setModalForm(!modalForm);
  };
  const removeUser = (id, name) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
    setUserDeleted(name);
    setModalRemove(!modalRemove);
  };
  const selectUser = (user) => {
    setUsernameSelected(user);
    setModalForm(!modalForm);
  };
  const deselectUser = () => setUsernameSelected(null);

  return (
    <div className="App">
      <nav>
        <h1>Usuarios</h1>
        <button onClick={showAndHideModal}>
          <i className="bx bx-plus"></i> Crear nuevo usuario
        </button>
      </nav>
      <UsersList
        users={users}
        removeUser={removeUser}
        selectUser={selectUser}
      />
      {modalForm && (
        <UsersForm
          getUsers={getUsers}
          showAndHideModal={showAndHideModal}
          usernameSelected={usernameSelected}
          deselectUser={deselectUser}
        />
      )}
      {modalRemove && (
        <div className="modal">
          <div className="modal-remove">
            <button
              className="btn-close"
              onClick={() => setModalRemove(!modalRemove)}
            >
              <i className="bx bx-x"></i>
            </button>
            <h1>Eliminar Usuario</h1>
            <p>El usuario <b>{userDeleted}</b> se ha eliminado</p>
            <button
              className="btn-to-accept"
              onClick={() => setModalRemove(!modalRemove)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
