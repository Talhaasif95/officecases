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
  pickerone: '',
  pickertwo: '',
  reason: '',
  note: '',
  city: '',
  location: '',
  userToken: '',
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
    case 'userToken':
      return {...state, userToken: action.payload};
    default:
      return state;
  }
};

const MainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'pickerone':
      return {...state, pickerone: action.payload};
    case 'pickertwo':
      return {...state, pickertwo: action.payload};
    case 'reason':
      return {...state, reason: action.payload};
    case 'note':
      return {...state, note: action.payload};
    case 'city':
      return {...state, city: action.payload};
    case 'location':
      return {...state, location: action.payload};
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
