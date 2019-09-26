import { AnyAction, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import _cvat from '../../../cvat-core/dist/cvat-core.node';

const cvat: any = _cvat;

export enum AuthActionTypes {
    AUTHORIZED_SUCCESS = 'AUTHORIZED_SUCCESS',
    AUTHORIZED_FAILED = 'AUTHORIZED_FAILED',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILED = 'REGISTER_FAILED',
}

export function registerSuccess(user: any): AnyAction {
    return {
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: {
            user,
        },
    };
}

export function registerFailed(registerError: any): AnyAction {
    return {
        type: AuthActionTypes.REGISTER_FAILED,
        payload: {
            registerError,
        },
    };
}

export function loginSuccess(user: any): AnyAction {
    return {
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
            user,
        },
    };
}

export function loginFailed(loginError: any): AnyAction {
    return {
        type: AuthActionTypes.LOGIN_FAILED,
        payload: {
            loginError,
        },
    };
}

export function authorizedSuccess(user: any): AnyAction {
    return {
        type: AuthActionTypes.AUTHORIZED_SUCCESS,
        payload: {
            user,
        },
    };
}

export function authorizedFailed(authError: any): AnyAction {
    return {
        type: AuthActionTypes.AUTHORIZED_FAILED,
        payload: {
            authError,
        },
    };
}

export function registerAsync({
    username,
    firstName,
    lastName,
    email,
    password1,
    password2,
}: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password1: string;
    password2: string;
}): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        let user = null;
        try {
            await cvat.server.register(username, firstName, lastName,
                email, password1, password2);
            user = await cvat.users.get({ self: true });
        } catch (error) {
            dispatch(registerFailed(error));
            return;
        }

        dispatch(registerSuccess(user));
    };
}

export function loginAsync({ username, password }: {username: string; password: string}):
ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        let user = null;
        try {
            await cvat.server.login(username, password);
            user = await cvat.users.get({ self: true });
        } catch (error) {
            dispatch(loginFailed(error));
            return;
        }

        dispatch(loginSuccess(user));
    };
}

export function authorizedAsync(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        let result = null;
        try {
            result = await cvat.server.authorized();
        } catch (error) {
            dispatch(authorizedFailed(error));
            return;
        }

        if (result) {
            const userInstance = await cvat.users.get({ self: true });
            dispatch(authorizedSuccess(userInstance));
        } else {
            dispatch(authorizedSuccess(null));
        }
    };
}