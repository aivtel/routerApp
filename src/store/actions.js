export const changeStateDropHandler = (arr) => {
    return {
        type: "CHANGE_STATE_DROP_HANDLER",
        arr: arr
    }
}

export const inputValue = (event) => {
    return {
        type: "INPUT_VALUE",
        event: event
    }
}

export const deleteListHandler = (id) => {
    return {
        type: "DELETE_LIST_HANDLER",
        id: id
    }
}

export const inputOnChange = (event) => {
    return {
        type: "INPUT_ON_CHANGE",
        event: event
    }
}