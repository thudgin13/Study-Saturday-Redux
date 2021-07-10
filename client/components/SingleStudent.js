import React from 'react';
import { fetchOneStudent } from '../redux/store'
import { connect } from 'react-redux'

const avgGrade = (tests) => {
  return Math.round(
    tests.map((test) => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //Gets the function off of props we created in mapDispatch
    this.props.loadOneStudent(this.props.match.params.id)
    //Uses match.params off of the React-Router-Dom to take the info we need off of the browswer which in this case is the studentID
  }

  render() {
    const { student } = this.props;
    const hasTests = student.tests.length;

    return (
      <div>
        <h3>Detail: {student.fullName}</h3>
        {hasTests ? (
          <React.Fragment>
            <h3>Average grade: {avgGrade(student.tests)}%</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.tests.map((test) => {
                    return (
                      <tr key={test.id}>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <h4>No tests on record.</h4>
        )}
      </div>
    );
  }
};
/*only getting our single student. The state.student should match what we have in the store whether its
singleStudent or oneStudent */
const mapStateToProps = (state) => ({
  student: state.student
})
/*map the thunk to a function that we call when we need it in componentDidMount to load the student details */
const mapDispatchToProps = (dispatch) => ({
  //Remember if we define a thunk with a parameter to complete the function, we need to give it that info!
  loadOneStudent: (id) => dispatch(fetchOneStudent(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
