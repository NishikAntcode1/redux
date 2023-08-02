console.log("learning redux");
// acction creators
// person who is sumitting the form

const newBooking = (name, amount) => {
    return {
        type : "NEW_BOOKING",
        payload : {
            name,
            amount
        }
    }
}

const cancelBooking = (name, refundAmount) => {
    return {
        type : "CANCEL_BOOKING",
        payload : {
            name,
            refundAmount
        }
    }
}

// reducers

const reservationHistory = (oldReservationList = [], action) => {
    if(action.type === "NEW_BOOKING"){
        return [...oldReservationList, action.payload]
    } else if (action.type == "CANCEL_BOOKING"){
        return oldReservationList.filter((record) =>  
            record.name !== action.payload.name
        )
    }
    return oldReservationList;
}

const cancelationHistory = (oldCancelationList = [], action) => {
    if(action.type === "CANCEL_BOOKING"){
        return [...oldCancelationList, action.payload]
    } 
    return oldCancelationList;
}

const accounting = (totalMoney = 0, action) => {
    if(action.type === "NEW_BOOKING"){
        return totalMoney + action.payload.amount;
    } 
    else if(action.type === "CANCEL_BOOKING"){
        return totalMoney - action.payload.refundAmount
    } 
    return totalMoney;
}

// store

// console.log(Redux)
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
    accounting : accounting,
    reservationHistory : reservationHistory,
    cancelationHistory : cancelationHistory
});
const store = createStore(railwayCentralStore);


const action = newBooking("Nishikant", 20);
store.dispatch(action);
console.log(store.getState());

const action1 = newBooking("Ankita", 30);
store.dispatch(action1);
console.log(store.getState());


const action2 = cancelBooking("johny", 30);
store.dispatch(action2);
console.log(store.getState());