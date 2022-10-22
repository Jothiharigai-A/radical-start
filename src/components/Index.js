import React, { Component } from "react";
import toastr from "cogo-toast";
import Create from "./Create";
import Edit from "./Edit";

class Index extends Component {
  
  constructor() {
    super();
    //--- Declare state variable for this component ---//
    this.state = {
      users: [
        {
          id: 1,
          firstname: "Raja",
          lastname: "Pandi",
          location: "Madurai",
          email: "raja2365@gmail",
          dob: "28/01/2000",
          education: "B.E",
        },
        {
          id: 2,
          firstname: " Siva",
          lastname: "Balan ",
          location: "Madurai",
          email: "sivabalan65@gmail",
          dob: "05/05/1998",
          education: "B.Tech",
        },
        {
          id: 3,
          firstname: "Priya ",
          lastname: "Lakshmi ",
          location: "Madurai",
          email: "priya525@gmail",
          dob: "02/08/2001",
          education: "M.sc",
        },
      ],
      editUser: {},
    };
    //--- Declare method for this component ---//
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }
  //--- Update state variable while any user insert or update ---//
  handleUpdateState(data, operation) {
    //--- 'operation==1' means update user ---//
    if (operation === 1) {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => {
          if (user.id === data.id) return Object.assign(user, data);
          else return user;
        }),
      }));
      return;
    }
    //--- 'operation==0' means insert user ---//
    var new_users = this.state.users.concat(data);
    this.setState({
      users: new_users,
    });
  }
  //--- Find editable user and update state variable ---//
  handleEditUser(userId) {
    this.setState({
      editUser: this.state.users.find((x) => x.id === userId),
    });
  }
  //--- Delete user and update state ---//
  handleDeleteUser(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user, i) => {
        return i !== id;
      }),
    }));
    toastr.error("User has been deleted successfully!", {
      position: "top-right",
      heading: "Done",
    });
  }

  render() {
    return (
      <div className="card">
        <div className="">
          <input placeholder="Search"/>
          <button
            type="button"
            className=" button5"
            data-toggle="modal"
            data-target="#addModal"
          >
            {" "}
            Add{" "}
          </button>
        </div>
        <div className=" table-pd">
          <div className="">
            <table className="table-bordered">
              <thead>
                <tr className="">
                  <th className="td"> Id </th>
                  <th className="td">First Name</th>
                  
                  <th className="td">Last Name</th>
                  <th className="td"> Location </th>
                  <th className="td"> Email </th>
                  <th className="td"> DOB </th>
                  <th className="td"> Education </th>
                  <th className="td">Action </th>
                  <th className="td"> Delete </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr key={i}>
                    <td className="td"> {user.id} </td>
                    <td className="td"> {user.firstname} </td>
                    <td className="td"> {user.lastname} </td>
                    <td className="td"> {user.location} </td>
                    <td className="td"> {user.email} </td>
                    <td className="td"> {user.dob} </td>
                    <td className="td"> {user.education} </td>
                    <td>
                      <button
                        className="button4 image-a  "
                        onClick={this.handleEditUser.bind(this, user.id)}
                        data-toggle="modal"
                        data-target="#editModal"
                      > <img className="image" src="https://i.imgur.com/R0vnjfE.png" alt="edit"></img>
                        {" "}
                        <span className="imgtxt">
                        Edit{" "}</span>
                      </button>
                    </td>
                    <td>
                      <button
                        className="button3 image-a  "
                        onClick={this.handleDeleteUser.bind(this, i)}
						data-toggle="modal"
                        data-target="deleteModal"
                      ><img className="image" src="https://i.imgur.com/g3SkqM4.png" alt="edit"></img>
                        {" "}
                        <span className="imgtxt">
                        Delete{" "}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Create updateState={this.handleUpdateState} />
        <Edit updateState={this.handleUpdateState} user={this.state.editUser} />
      </div>
    );

  }
}
export default Index;
