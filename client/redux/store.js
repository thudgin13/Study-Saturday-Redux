import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:
const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_ONE_STUDENT = 'GOT_ONE_STUDENT'
/*Action Type: naming a variable for an action that will exist*/

// ACTION CREATORS go here:
/*All changes happen via actions, so this is a report of the change that happened.
Actions only describe facts that happened...
In this case we are reporting that we got the students */
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students
});

const gotOneStudent = (student) => ({
  type: GOT_ONE_STUDENT,
  student
})


// THUNK CREATORS go here:
/*Create a thunk that will go to the API on our server and get the info 
we need from the database then it dispatches the action to report that it has it and what the data is */
export const fetchStudents = () => async (dispatch) => {
  const { data } = await axios.get('/api/students');
  dispatch(gotStudents(data));
}

export const fetchOneStudent = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/students/${id}`)
  dispatch(gotOneStudent(data))
}

//Our initial state that can be accessed anywhere as long as we map it to the components.
//We indentified we need students on state and set it equal to an empty array
const initialState = {
  students: [],
  student: {}
};
//Reducer, takes in the initial state, follows the instructions in "action" and returns something
//similar to the Array.prototype.reduce method
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      //this will replace the empty array with a new array of students that the action reports
      return {
        ...state,
        students: action.students
      }
    case GOT_ONE_STUDENT:
      return {
        student: action.student
      }
    default:
      return state;
  }
}

/*Allows us to use the middelware and applies it to the store */
const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));


export default store;
