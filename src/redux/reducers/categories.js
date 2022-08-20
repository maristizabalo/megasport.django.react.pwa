import { GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS } from "../actions/types";

const initialState = {
    categories: null
}

export default function Categories(state= initialState, action){
    const {type, payload} = action

    switch(type){

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }

        default:
            return state
    }
}