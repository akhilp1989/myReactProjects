import axios from '../apis/axios'

export const fetchPosts = () => {
    return async function  (dispatch) {
        let response = await axios.get('/posts/')
        return dispatch({type:'GET_POSTS',payload:response.data})
    }   
}
export const fetchUser = (id) => {
    return async function (dispatch) {
        let response=await axios.get('/users/'+id)
        return dispatch({type:'GET_USER',payload:response.data})
    }
}