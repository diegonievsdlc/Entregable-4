const UsersList = ({ users, removeUser, selectUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h2>{user.first_name + " " + user.last_name}</h2>
          <div className="user-info">
            <h4>CORREO</h4>
            <span>{user.email}</span>
            <h4>CUMPLEAÑOS</h4>
            <span>
              <i className="bx bx-gift"></i> {user.birthday}
            </span>
          </div>
          <div className="btn-card">
            <button
              type="button"
              onClick={() =>
                removeUser(user.id, user.first_name + " " + user.last_name)
              }
            >
              <i className="bx bx-trash"></i>
            </button>
            <button type="button" onClick={() => selectUser(user)}>
              <i className="bx bx-pencil"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
