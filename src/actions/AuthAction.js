export const SET_AUTHENTICATED_USER = 'SET_AUTH_USER';

export function setAuthenticatedUser(id) {
    return {
        type: SET_AUTHENTICATED_USER,
        id
    };
}
