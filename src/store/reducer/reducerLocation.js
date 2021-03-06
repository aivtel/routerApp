const initialState = {
    locationName: [],
    starterPoint: "",
    destinationPoint: "",
    newAddress: "",
    waypoints: [],
    userId: "",
    fetchLoading: true,
    sum: 0,
    routesDB: [],
    routesDBError: '',
    toggleMenu: false
};

const changeStateHandler = (state, arr) => {
    if (arr.length === 0) {
        return {
            ...state,
            locationName: [],
            destinationPoint: "",
            starterPoint: "",
            newAddress: '',
            waypoints: []
        }
    };

    if (arr.length === 1) {
        return {
            ...state,
            locationName: arr,
            destinationPoint: arr[0].value,
            starterPoint: arr[0].value,
            newAddress: '',
            waypoints: []
        };
    };

    if (arr.length === 2) {
        return {
            ...state,
            locationName: arr,
            destinationPoint: arr[arr.length - 1].value,
            starterPoint: arr[0].value,
            newAddress: '',
            waypoints: []
        };
    };

    if (arr.length > 2) {
        const lastIndex = arr.length - 1;
        // eslint-disable-next-line
        const newWaypointArr = arr.filter((i, index) => {
            if (index !== 0 && index !== lastIndex) {
                return true
            }
        }).map((item) => {
            return ({
                location: item.value,
                stopover: true
            })
        });

        return {
            ...state,
            locationName: arr,
            destinationPoint: arr[arr.length - 1].value,
            starterPoint: arr[0].value,
            newAddress: '',
            waypoints: newWaypointArr
        }
    };

};

const inputValue = (state, action) => {
    if(action.event.key === 'Enter') {
        const updLocationName = [...state.locationName];
        const newObj = {
            id: updLocationName.length + 1,
            value: action.event.target.value
        };
        updLocationName.push(newObj);
        return changeStateHandler(state, updLocationName);            
    } else {
        return state
    }
};

const deleteListHandler = (state, action) =>{
        // eslint-disable-next-line
    const updArr = [...state.locationName].filter((item, index) => {
        if(item.id !== action.id){
            return true
        }
    });
   return changeStateHandler(state, updArr);
};

const inputOnChange = (state, action) => {
   return {
        ...state,
        newAddress: action.event.target.value
    }
};

const changeStateDropHandler = (state, action) => {
    return changeStateHandler (state, action.arr)
};

const fetchRoutesSuccess = (state, action) => {
    return {
        ...state,
        routesDB: action.routes,
        fetchLoading: false
    }
};

const fetchRoutesFail = (state, action) => {
    return {
        ...state,
        routesDBError: action.error
}
};

const toggleMenu = (state) => {
    return {
        ...state,
        toggleMenu: !state.toggleMenu
    }
};

const reducer = (state = initialState, action) => {
        switch (action.type) {
            case "CHANGE_STATE_DROP_HANDLER": return changeStateDropHandler(state, action);
            case "INPUT_VALUE": return inputValue(state, action);
            case "DELETE_LIST_HANDLER": return deleteListHandler(state, action);
            case "INPUT_ON_CHANGE": return inputOnChange(state, action);
            case "FETCH_ROUTES_SUCCESS": return fetchRoutesSuccess (state, action);
            case "FETCH_ROUTES_FAIL": return fetchRoutesFail (state, action);
            case "TOGGLE_MENU": return toggleMenu(state, action);
            default: return state
        }
};

export default reducer;