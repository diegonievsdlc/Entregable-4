import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UsersForm = ({
  getUsers,
  showAndHideModal,
  usernameSelected,
  deselectUser,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (usernameSelected !== null) {
      reset({
        first_name: usernameSelected.first_name,
        last_name: usernameSelected.last_name,
        email: usernameSelected.email,
        password: usernameSelected.password,
        birthday: usernameSelected.birthday,
      });
    }
  }, [usernameSelected, reset]);
  const submit = (data) => {
    if (usernameSelected === null) {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => getUsers());
    } else {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${usernameSelected.id}/`,
          data
        )
        .then(() => getUsers());
    }
    showAndHideModal();
    deselectUser();
    reset(defaultValues);
  };

  return (
    <div className="users-form modal">
      <form onSubmit={handleSubmit(submit)}>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            deselectUser();
            showAndHideModal();
          }}
        >
          <i className="bx bx-x"></i>
        </button>
        {usernameSelected === null ? (
          <h2>Nuevo Usuario</h2>
        ) : (
          <h2>Editar Usuario</h2>
        )}
        <div>
          <label htmlFor="first_name">Nombre</label>
          <input
            type="text"
            {...register("first_name")}
            id="first_name"
            placeholder="Nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            {...register("last_name")}
            id="last_name"
            placeholder="Apellido"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            id="password"
            placeholder="Contraseña"
            required
          />
          <button
            type="button"
            className="show-and-hide"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className="bx bx-show"></i>
          </button>
        </div>
        <div>
          <label htmlFor="birthday">Fecha de nacimiento</label>
          <input
            type="date"
            {...register("birthday")}
            id="birthday"
            placeholder="MM/DD/YYYY"
            required
          />
        </div>
        <button className="btn-to-accept">
          {usernameSelected === null
            ? "Agregar nuevo usuario"
            : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default UsersForm;
