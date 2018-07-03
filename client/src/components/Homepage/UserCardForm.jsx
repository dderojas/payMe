import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { setAppliedRoles } from '../../store/actions/userActions'
// import { BADHINTS } from 'dns';
import axios from 'axios';


export class UserCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      active_role: '',

    };

    this.activeRoleChange = this.activeRoleChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAppliedRoles((data) => {
      this.props.setAppliedRoles(data);
    });
  }

  firstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  lastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  activeRoleChange(event) {
    this.setState({ active_role: event.target.value });
  }

  getAppliedRoles(callback) {
    axios.get(`/api/roles?user_id=${this.props.session.user.id}`).then(res => {
      callback(res.data);
    })
    .catch(err => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.patch((`/api/user?id=${this.props.session.user.id}`), {
      'first_name': this.state.firstName,
      'last_name': this.state.lastName,
      'email': this.state.email || this.props.session.user.email,
      'active_role': this.state.active_role
    })
    .then((response) => {
      console.log(response);
    });
  }

  render() {
    console.log(this.state);

    return (
      <div className="ui teal card">
        <h4 className="ui dividing header left aligned segment">Edit User's Profile</h4>
        <form className="ui-form" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="left aligned segment" style={{ fontWeight: 'bold' }}>
              Full Name
            </div>
            <div className="inline fields">
              <div className="field">
                <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.firstNameChange}></input>
              </div>
              <div className="field">
                <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.lastNameChange}></input>
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Email: '}
            </label>
            <div className="field">
              <input type="text" value={this.state.email} onChange={this.emailChange} />
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight:'bold'}}>
            {'Active role: '}
            </label>
            <div className="field">
              <select id="applied-roles" style={{'width': '100%'}} onChange={this.activeRoleChange}>
              { this.props.session.roles ? this.props.session.roles.map((role, index) => {
                if(this.props.session.user.active_role[0].id === role.id) {
                  return <option key={index} value={role.id} selected>{`${role.name} at ${role.company.name}`}</option>
                } else {
                  return <option key={index} value={role.id}>{`${role.name} at ${role.company.name}`}</option>
                }
              }) : undefined}
              </select>
            </div>
          </div>
          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Current Salary: '}
            </label>
            <div className="field">
              <input type="text" value={this.state.salary} onChange={this.salaryChange} />
            </div>
          </div>

        <div className="button-container">
          <button className="ui-button-cancel">Cancel</button>
          <button className="ui-button-confirm">Confirm</button>
        </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {session : state.user}
}
 const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
     setAppliedRoles
   }, dispatch);
 }
export default connect(mapStateToProps, mapDispatchToProps)(UserCardForm);