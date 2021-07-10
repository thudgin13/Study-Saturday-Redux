import React from 'react';
import { Link } from 'react-router-dom'
//import connect to connect it to the store
import { connect } from 'react-redux'
//import our thunk from the store
import { fetchStudents } from '../redux/store'


class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //loadStudents is the thunk that we mapped in via mapDispatchToProps below
    this.props.loadStudents()
  }

  render() {

    //going to mapStateToProps via props and mapping through students array
    return (
      <ul>
        {this.props.students.map((student) => (
          <li key={student.id}>
            <div>
              <p>Name: {student.fullName}</p>
              <p>Email: {student.email}</p>
            </div>
          </li>
        ))}
      </ul>
    )

  }
}
/*Mapping the initial state object from the store to this component.
We only need students so state.students*/
const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}
/*Mapping the thunk that we need to dispatch the action 
to update state in the reducer. We label the function anything we want */
const mapDispatchToProps = (dispatch) => ({
  loadStudents: () => dispatch(fetchStudents())
})



export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
