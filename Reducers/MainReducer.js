import {combineReducers} from 'redux';
const INITIAL_STATE = {
  loginData: {},
  name: '',
  email: '',
  age: '',
  gender: '',
  weight: '',
  password: '',
  confirmpassword: '',
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //donot mutate state directly
    case 'loginData':
      return {...state, loginData: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'password':
      return {...state, password: action.payload};
    default:
      return state;
  }
};

const MainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const SignUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'name':
      return {...state, name: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'age':
      return {...state, age: action.payload};
    case 'gender':
      return {...state, gender: action.payload};
    case 'weight':
      return {...state, weight: action.payload};
    case 'password':
      return {...state, password: action.payload};
    case 'confirmpassword':
      return {...state, confirmpassword: action.payload};
    default:
      return state;
  }
};
export default combineReducers({LoginReducer, MainReducer, SignUpReducer});
