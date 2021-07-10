import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

// ACTION TYPES go here:
const GET_STUDENTS = 'GET_STUDENTS'

// ACTION CREATORS go here:
const getStudents = (students) => ({
  type: GET_STUDENTS,
  students
})

// THUNK CREATORS go here:
const fetchStudents = () => async (dispatch) => {
  const { data } = await axios.get('/api/students')
  /*Here we are dispatching the action and the parameter is the response from our 
  backend which is all the action takes to our reducer  Just reporting facts!*/
  dispatch(getStudents(data))
}

const initialState = {
  students: []
};

const reducer = (state = initialState, action) => {

  /*Takes the action and makes a change based on what's reported in the action.
  Rememeber Array.prototype.reduce? Kind of like it takes instructions and produces something new based on them */
  switch (action.type) {
    case GET_STUDENTS:
      //using the spread operator to add the new into the previous array
      return {
        ...state,
        students: action.students
      }
      case GOT_ONE_STUDENT:
        //This state only takes one object at a time so we are just replacing it with what the action brings
        return {
          student: action.student
        }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));
store.dispatch({ type: 'HELLO_WORLD' })

export default store;
