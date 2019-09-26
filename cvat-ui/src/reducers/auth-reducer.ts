import { AnyAction } from 'redux';

import { AuthActionTypes } from '../actions/auth-actions';


export interface AuthState {
    initialized: boolean;
    authError: any;
    loginError: any;
    registerError: any;
    user: any;
}

const defaultState: AuthState = {
    initialized: false,
    authError: null,
    loginError: null,
    registerError: null,
    user: null,
};

export default (state = defaultState, action: AnyAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTHORIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
                user: action.payload.user,
                authError: null,
            };
        case AuthActionTypes.AUTHORIZED_FAILED:
            return {
                ...state,
                initialized: true,
                authError: action.payload.authError,
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                initialized: true,
                user: action.payload.user,
                loginError: null,
            };
        case AuthActionTypes.LOGIN_FAILED:
            return {
                ...state,
                initialized: true,
                user: null,
                loginError: action.payload.loginError,
            };
        default:
            return state;
    }
};
