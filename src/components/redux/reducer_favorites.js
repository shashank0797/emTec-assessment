const favoriteList = (state = [], action) => {
    switch(action.type){
        case "FAVORITES":
            return action.payload
        default: 
            return state
    }
}

export default favoriteList