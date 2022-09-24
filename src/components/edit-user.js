import React, { Component } from "react";
import { withRouter } from "../generic/withRouter";
import { getUsers, getUserByID, updateUser } from "../backend/utils";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "../index.css";
import "react-datepicker/dist/react-datepicker.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);

    this.state = {
      username: "",
      email: "",
      birthdate: new Date(),
      users: [],
    };
  }

  //getting user by id
  getUserByID = async (id) => {
    try {
      const response = await getUserByID(id);
      this.setState({
        username: response.username,
        email: response.email,
        birthdate: new Date(response.birthdate),
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //getting user data for selection in dropdown of user list
  getUsers = async () => {
    try {
      const userList = await getUsers();
      const usersOption = userList.map((el) => el.username);
      this.setState({ users: usersOption });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.getUserByID(this.props.match.params.id);
    this.getUsers();
  }

  // handler for username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  //handler for email
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  //handler for birthdate
  onChangeBirthDate(date) {
    this.setState({
      birthdate: new Date(date),
    });
  }

  // submit handler
  onSubmit(data) {
    const { username, email, birthdate } = data;
    const users = {
      username: username,
      email: email,
      birthdate: birthdate,
    };

    updateUser(this.props.match.params.id, users)
      .then((res) => {
        toast.success(
          `User Updated Sucessfully ! Status : ${res?.data?.status}`,
          {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  render() {
    return (
      <div className="card m-auto w-50">
        <h5 className="card-header">Edit User</h5>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {this.state?.users?.map(function (user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label>Birth Date: </label>
              <div>
                <DatePicker
                  selected={this.state.birthdate}
                  onChange={this.onChangeBirthDate}
                  showMonthDropdown
                  showYearDropdown
                />
              </div>
            </div>

            <div className="form-group d-flex justify-content-between">
              <input
                type="button"
                value="Update User"
                className="btn btn-dark mt-3 m-auto"
                onClick={() => this.onSubmit(this.state)}
              />
              <input
                type="button"
                value="Go Back"
                className="btn btn-dark mt-3 m-auto"
                onClick={() => this.props.navigate("/")}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(EditUser);
