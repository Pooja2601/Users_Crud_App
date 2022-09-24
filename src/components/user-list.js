import React, { Component } from "react";
import { withRouter } from "../generic/withRouter";
import { getUsers, deleteUser } from "../backend/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//user details list
const User = (props) => {
  return (
    <tr>
      <td>{props.users.username}</td>
      <td>
        <img
          src={props.users.avatar}
          alt={props.users.username}
          className="img-thumbnail"
        />
      </td>
      <td>{props.users.email}</td>
      <td>{new Date(props.users.birthdate).toLocaleString()}</td>
      <td>
        <EditIcon
          onClick={() => {
            props.navigate(`/edit/${props.users.userId}`);
          }}
        />{" "}
        |
        <DeleteIcon
          onClick={() => {
            props.deleteUser(props.users.userId);
          }}
        />
      </td>
    </tr>
  );
};

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [] };
  }

  //getting user on component mount
  getUsers = async () => {
    try {
      const userList = await getUsers();
      this.setState({ users: userList });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  deleteUser = (id) => {
    const { users } = this.state;
    const deletedUser = deleteUser(id, users);
    this.setState({ users: deletedUser });
  };

  updateUser = (user) => {
    this.setState({ users: user });
  };

  userList() {
    return this.state.users.map((el) => {
      return (
        <User
          users={el}
          deleteUser={this.deleteUser}
          key={el.userId}
          navigate={this.props.navigate}
          updateUser={(user) => this.updateUser(user)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users List</h3>
        <div className="table-responsive-lg">
          <table className="table table-light table-hover m-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Birth Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="p-3" data-testid="userList">
              {this.userList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(UsersList);
