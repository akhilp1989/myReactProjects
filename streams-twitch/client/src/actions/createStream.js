import axios from './apis'
import history from '../history'
export const createStream = (formValues)=> {
    return async function (dispatch) {
        let response = await axios.post('/streams', formValues)
        dispatch({ type: 'CREATE_STREAM', payload: response.data })
        history.push('/')
}
   
}
export const fetchStreams = () => {
    return async function (dispatch) {
        let response = await axios.get('/streams')
        dispatch({type:'FETCH_STREAMS',payload:response.data})
}
   
}
export const fetchStream = (id) => {
    return async function (dispatch) {
        let response = await axios.get(`/streams/${id}`)
        dispatch({ type: 'FETCH_STREAM', payload: response.data })
        
}
   
}
export const editStream = (id,formValues)=> {
    return async function (dispatch) {
        let response = await axios.patch(`/streams/${id}`,formValues)
        dispatch({ type: 'EDIT_STREAM', payload: response.data })
        history.push('/')
}
   
}
export const deleteStream = (id) => {
    console.log('inside delete',id  )
    return async function (dispatch) {
        await axios.delete(`/streams/${id}`)
        dispatch({ type: 'DELETE_STREAM', payload: id })
        history.push('/')
}
   
}