import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor() {
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			user_id   : '',
			firstname  : '',
			lastname  : '',
			location : '',
			email 	  : '',
			dob  : '',
			education  : '',
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(user_data) {
		this.setState({
			user_id   : user_data.user.id,
		firstname  : user_data.user.firstname,
		lastname  : user_data.user.lastname,
			location : user_data.user.location,
			email     : user_data.user.email,
			dob    : user_data.user.dob,
			education     : user_data.user.education
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Update state users variable by props method ---//
	handleUpdateUser(e) {
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			id        : this.state.user_id,
			firstname  : this.state.firstname,
			lastname  : this.state.lastname,
			location : this.state.location,
			email     : this.state.email,
			dob     : this.state.dob,
			education     : this.state.education
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
			toastr.warn('User data updated successfully!', {position : 'top-right', heading: 'Done'});
		}
	}
    //--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.firstname.length === 0) {
    		error.firstname = ['This field is required!'];
    	}
		if(fields.lastname.length === 0) {
    		error.lastname = ['This field is required!'];
    	}
    	if(fields.location.length === 0) {
    		error.location = ['This field is required!'];
    	}
    	if(fields.email.length === 0) {
    		error.email = ['This field is required!'];
    	}
		if(fields.dob.length === 0) {
    		error.dob = ['This field is required!'];
    	}
		if(fields.education.length === 0) {
    		error.education = ['This field is required!'];
    	}
		
		this.setState({
			errors : error
		})
		if(fields.firstname.length === 0 || fields.lastname.length === 0 || fields.location.length === 0 || fields.email.length === 0| fields.dob.length === 0| fields.education.length === 0) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while update user ---//
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
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="firstname" className="col-form-label">Firstname:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('firstname') ? 'is-invalid' : ''}`}
			            		 id="firstname" name="firstname" placeholder="firstname " onChange={this.handleInputFieldChange} value={this.state.firstname}/>
			            		{this.renderErrorFor('firstname')}
			         	 	</div>
							  <div className="form-group">
			            		<label htmlFor="lastname" className="col-form-label">lastname:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('lastname') ? 'is-invalid' : ''}`}
			            		 id="lastname" name="lastname" placeholder="lastname " onChange={this.handleInputFieldChange} value={this.state.lastname}/>
			            		{this.renderErrorFor('lastname')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="location" className="col-form-label">location :</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('location') ? 'is-invalid' : ''}`}
			            		 id="location" name="location" placeholder="location no" onChange={this.handleInputFieldChange} value={this.state.location}/>
			            		{this.renderErrorFor('location')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="email" className="col-form-label">Email:</label>
			            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
			            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
			            		{this.renderErrorFor('email')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="dob" className="col-form-label">DOB:</label>
			            		<input type="dob" className={`form-control form-control-sm ${this.hasErrorFor('dob') ? 'is-invalid' : ''}`}
			            		 id="dob" name="dob" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.dob}/>
			            		{this.renderErrorFor('dob')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="education" className="col-form-label">Education:</label>
			            		<input type="education" className={`form-control form-control-sm ${this.hasErrorFor('education') ? 'is-invalid' : ''}`}
			            		 id="dob" name="education" placeholder="education" onChange={this.handleInputFieldChange} value={this.state.education}/>
			            		{this.renderErrorFor('education')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit