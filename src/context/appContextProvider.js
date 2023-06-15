import  AuthState  from './auth/authState';
import CourseState from "./course/courseState";
import { combineComponents } from './combineContext.tsx';

const providers = [
    AuthState,
    CourseState
]

export const AppContextProvider = combineComponents(...providers);