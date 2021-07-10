import { combineReducers } from 'redux';

const initialState = {
    appointments: []
};

const appointmentReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'CREATE_APPOINTMENT':
 
        return { 
            ...state, 
            appointments: [...state.appointments, action.data]
        };

        default:

        return state;
    }
}

export default combineReducers({ appointmentReducer });