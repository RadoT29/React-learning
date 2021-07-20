const loggedReducer = (state = false, action) => {
    switch(action.type){
        case 'SIGN':
            return !state;
        default:
            return state;
    }
};

export default loggedReducer