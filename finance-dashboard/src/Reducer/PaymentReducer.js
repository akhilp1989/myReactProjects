import { actionTypes } from "../Actions/Constants"


export const paymentReducer  = (state = actionTypes.INITIAL_STATE,action)=>{

    switch(action.type){
        
        case actionTypes.POST_PAYMENT:
            let newObj = {...state,
                payments:[...state.payments,action.payload]
            }
            return newObj
        default:
            return {...state};
            
    }
}



