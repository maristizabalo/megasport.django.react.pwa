import { GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS } from "./types";
import axios from 'axios'

export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept':'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/categories`, config)

        if (res.status === 200){
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        })
    }
}