import React, { Component } from "react";
import { createUser } from "../backend/utils";
import { withRouter } from "../generic/withRouter";
import { toast } from "react-toastify";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // handler for firstname
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  // handler for lastname
  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  //handler creation of user
  createUser = async (data) => {
    try {
      const result = await createUser(data);
      console.log(result, "user created");
      toast.success(
        `User Created Sucessfully! Status : ${result?.data?.status}`,
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
    } catch (error) {
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

  onSubmit(e) {
    e.preventDefault();
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    };
    this.createUser(user);
    this.setState({
      firstname: "",
      lastname: "",
    });
  }

  render() {
    return (
      <div className="card m-auto w-50">
        <h5 className="card-header">Create New User</h5>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>First Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.firstname}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className="form-group">
              <label>Last Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.lastname}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <input
                type="button"
                value="Create User"
                className="btn btn-dark mt-3 m-auto"
                onClick={(e) => this.onSubmit(e)}
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
export default withRouter(CreateUser);
