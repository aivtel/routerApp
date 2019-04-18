const initialState = {
    token: null,
    localId: null,
    error: null
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        localId: action.localId,
        error: null
    }
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error
    }
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        localId: null
    }
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_SUCCESS": return authSuccess(state, action);
        case "AUTH_FAIL": return authFail(state, action);
        case "AUTH_LOGOUT": return authLogout(state, action);
        default: return state;
    }
}

export default reducer;