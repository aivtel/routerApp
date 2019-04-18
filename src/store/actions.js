import axios from 'axios';

export const changeStateDropHandler = (arr) => {
    return {
        type: "CHANGE_STATE_DROP_HANDLER",
        arr: arr
    }
};

export const inputValue = (event, userId) => {
    return {
        type: "INPUT_VALUE",
        event: event,
        userId: userId
    }
};

export const deleteListHandler = (id) => {
    return {
        type: "DELETE_LIST_HANDLER",
        id: id
    }
};

export const inputOnChange = (event) => {
    return {
        type: "INPUT_ON_CHANGE",
        event: event
    }
};

export const authSuccess = (idToken, localId) => {
    return {
        type: "AUTH_SUCCESS",
        idToken: idToken,
        localId: localId
    };
};

export const authFail = (error) => {
    return {
        type: "AUTH_FAIL",
        error: error
    };
};

export const logout = () => {
    return {
        type: "AUTH_LOGOUT"
    };
};

export const authSignUp = (email, password) => {
    return (dispatch) => {
        // dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=process.env.REACT_APP_GOOGLE_FIREBASE_API', authData)
                .then(res => {
                    // const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    // localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', res.data.localId);
                    dispatch(authSuccess(res.data.idToken, res.data.localId));
                    // dispatch(checkAuthTimeout(res.data.expiresIn));
                    
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                });
        
    };
};

export const authSignIn = (email, password) => {
    return (dispatch) => {
        // dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=process.env.REACT_APP_GOOGLE_FIREBASE_API', authData)
                .then(res => {
                    // const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    // localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', res.data.localId);
                    dispatch(authSuccess(res.data.idToken, res.data.localId));
                    // dispatch(checkAuthTimeout(res.data.expiresIn));
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                });
        
    };
};

export const postDataSuccess = (id, locations) => {
    return {
        type: "POST_DATA_SUCCESS",
        routesPathId: id,
        locations: locations
    };
};

export const postDataFail = (error) => {
    return {
        type: "POST_DATA_FAIL",
        error: error
    };
}

export const saveLocationsToDB = (locations, userId, token) => {
    let objToDB = {
        locations: locations.map(i => i.value),
        userId: userId
    };
    return (dispatch) => {
        axios.post('https://routeapp-5361d.firebaseio.com/routes.json?auth=' + token, objToDB)
        .then(res => {
                dispatch(postDataSuccess(res.data.name, locations));
                alert("Маршрут сохранен");
            })
            .catch(err => {
                dispatch(postDataFail(err));
                alert(err);
            });
    }; 
};

export const fetchRoutesSuccess = (routes) => {
    return {
        type: "FETCH_ROUTES_SUCCESS",
        routes: routes
    }
};

export const fetchRoutesFail = (err) => {
    return {
        type: "FETCH_ROUTES_FAIL",
        error: err
    }
};

export const fetchRoutes = (token, localId) => {
    return (dispatch) => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + localId + '"';
        axios.get('https://routeapp-5361d.firebaseio.com/routes.json' + queryParams)
            .then(res => {
                const routes = [];
                for (let key in res.data) {
                    routes.push({...res.data[key], id: key});
                }
                dispatch(fetchRoutesSuccess(routes));
            })
            .catch(err => {
                dispatch(fetchRoutesFail(err));
                alert("Ошибка в авторизации");
            });
    };
};

export const toggleMenu = () => {
    return {
        type: "TOGGLE_MENU"
    }
};