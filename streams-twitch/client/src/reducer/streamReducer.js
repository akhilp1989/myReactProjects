import _  from 'lodash';
export const streamReducer = (state = {}, action) => {
    switch (action.type) {
        
            case 'FETCH_STREAM':
                return {
                    ...state,
                    [action.payload.id]:action.payload
                }
            case 'CREATE_STREAM':
                    return {
                        ...state,
                        [action.payload.id]:action.payload
                    }
            case 'EDIT_STREAM':
            return {
                ...state,
                [action.payload.id]:action.payload
            }
        case 'DELETE_STREAM':
            
            return { ..._.omit(state, action.payload) }
        case 'FETCH_STREAMS':
            let newObj={}
            action.payload.map(k => {
                let key = Object.keys(k)[2]
                 newObj[k[key]]=k
            })
            return {
                ...state,
                ...newObj
                
            }
        default:
            return state
    }
}