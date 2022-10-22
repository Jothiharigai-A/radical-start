import React, { Component } from "react";
import toastr from "cogo-toast";

class Create extends Component {
  constructor() {
    super();
    //--- Declare state variable for this component ---//
    this.state = {
      errors: [],
      id: "",
      firstname: "",
      lastname: "",
      location: "",
      email: "",
      dob: "",
      education: "",
    };
    //--- Declare method for this component ---//
    this.baseState = this.state;
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.handleInsertUser = this.handleInsertUser.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }
  //--- Update state variable value while input field change ---//
  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //--- Insert new user in users state array by props method ---//
  handleInsertUser(e) {
    e.preventDefault();
    const data = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      location: this.state.location,
      email: this.state.email,
      dob: this.state.dob,
      education: this.state.education,
    };
    if (!this.checkValidation(data)) {
      this.reset();
      this.props.updateState(data, 0);
      document.getElementById("closeAddModal").click();
      toastr.success("New user added successfully!", {
        position: "top-right",
        heading: "Done",
      });
    }
  }
  //--- Validate all input field ---//
  checkValidation(fields) {
    var error = {};
    if (fields.firstname.length === 0) {
      error.firstname = ["This field is required!"];
    }
    if (fields.lastname.length === 0) {
      error.lastname = ["This field is required!"];
    }
    if (fields.location.length === 0) {
      error.location = ["This field is required!"];
    }
    if (fields.email.length === 0) {
      error.email = ["This field is required!"];
    }
    if (fields.dob.length === 0) {
      error.dob = ["This field is required!"];
    }
    if (fields.education.length === 0) {
      error.education = ["This field is required!"];
    }
    this.setState({
      errors: error,
    });
    if (
      fields.firstname.length === 0 ||
      fields.lastname.length === 0 ||
      fields.location.length === 0 ||
      fields.email.length === 0 ||
      fields.dob.length === 0 ||
      fields.education.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  //--- Reset all state variable while insert new user ---//
  reset() {
    this.setState(this.baseState);
  }
  //--- Check that any validation errors occure for input field ---//
  hasErrorFor(fieldName) {
    return !!this.state.errors[fieldName];
  }
  //--- Render error for specific validation fail input field ---//
  renderErrorFor(fieldName) {
    if (this.hasErrorFor(fieldName)) {
      return (
        <em className="error invalid-feedback">
          {" "}
          {this.state.errors[fieldName][0]}{" "}
        </em>
      );
    }
  }

  render() {
    return (
      <div
        className="modal fade "
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className=" create" role="document">
          <div className="modal-content create">
            <div className="img-pd">
              <button
                type="button"
                id="closeAddModal"
                className="close-btn"
                data-dismiss="modal"
              >
                <img
                  className="img"
                  src="https://i.imgur.com/6xfyuPF.png"
                  alt="arrow"
                ></img>
              </button>
            </div>
            <h5 className=" head float">Add Student Details</h5>
            <div className="modal-dialog"></div>
            <form onSubmit={this.handleInsertUser}>
              <div className="create-p">
                <div className="flex">
                  <div className="flex-a">
                    <label htmlFor="firstname">First name :</label>
                    <input
                      type="text"
                      className={`input ${
                        this.hasErrorFor("firstname") ? "is-invalid" : ""
                      }`}
                      id="firstname"
                      name="firstname"
                      placeholder="Enter your first name"
                      onChange={this.handleInputFieldChange}
                      value={this.state.firstname}
                    />
                    {this.renderErrorFor("firstname")}
                  </div>
                  <div className="flex-a ">
                    <label htmlFor="lastname">Last name :</label>
                    <input
                      type="text"
                      className={` input  ${
                        this.hasErrorFor("lastname") ? "is-invalid" : ""
                      }`}
                      id="lastname"
                      name="lastname"
                      placeholder="Enter your last name"
                      onChange={this.handleInputFieldChange}
                      value={this.state.lastname}
                    />
                    {this.renderErrorFor("lastname")}
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-a">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      className={` input ${
                        this.hasErrorFor("email") ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={this.handleInputFieldChange}
                      value={this.state.email}
                    />
                    {this.renderErrorFor("email")}
                  </div>
                  <div className="flex-a">
                    <label htmlFor="dob">DOB:</label>
                    <input
                      type="date"
                      className={`input-cal input ${
                        this.hasErrorFor("dob") ? "is-invalid" : ""
                      }`}
                      id="dob"
                      name="dob"
                      placeholder="dd/mm/yyyy" 
                      onChange={this.handleInputFieldChange}
                      value={this.state.dob}
                    />
                    {this.renderErrorFor("dob")}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-a">
                    <label htmlFor="education">Education:</label>
                    <input
                      type="text"
                      className={`input ${
                        this.hasErrorFor("education") ? "is-invalid" : ""
                      }`}
                      id="education"
                      name="education"
                      placeholder="Enter your education"
                      onChange={this.handleInputFieldChange}
                      value={this.state.education}
                    />
                    {this.renderErrorFor("education")}
                  </div>
                  <div className="flex-a">
                    <label htmlFor="location">location:</label>
                    <input
                      type="text"
                      className={` input ${
                        this.hasErrorFor("location") ? "is-invalid" : ""
                      }`}
                      id="location"
                      name="location"
                      placeholder="Enter your location "
                      onChange={this.handleInputFieldChange}
                      value={this.state.location}
                    />
                    {this.renderErrorFor("location")}
                  </div>
				  
                </div>
				<div className="about">
                    <label htmlFor="location">About:</label>
                    <input
                      type="text"
                      className={`input input-a ${
                        this.hasErrorFor("about") ? "is-invalid" : ""
                      }`}
                      id="about"
                      name="about"
                      placeholder="Enter your details"
                      onChange={this.handleInputFieldChange}
                      value={this.state.location}
                    />
                    {this.renderErrorFor("about")}
                  </div>
              </div>
              <div className="submit-a">
                
                <button type="submit" className="button5 submit">
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;
