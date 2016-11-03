import { TOGGLE, SELECTMENU, UPDATEMENU, SHOWPARKINGLIST, HIDEPARKINGLIST, OPENMODAL, CLOSEMODAL, LOADPARKINGLIST } from './constants'

export const toggleMenu = () => {
  return {
    type: TOGGLE,
  }
}

export const selectMenu = (item) => {
  return {
    type: SELECTMENU,
    payload: {
    	item
    }
  }
}

export const updateMenu = (isOpen) => {
  return {
    type: UPDATEMENU,
    payload: {
    	isOpen
    }
  }
}

export const closeModal = () => {
  return {
    type: CLOSEMODAL,
  }
}

export const openModal = () => {
  return {
    type: OPENMODAL,
  }
}

export const showParkingList = () => {
  return {
    type: SHOWPARKINGLIST,
  }
}

export const hideParkingList = () => {
  return {
    type: HIDEPARKINGLIST,
  }
}

export const loadParkingList = () => {
  return (dispatch) => {
    setTimeout(() => {
        dispatch({ type: LOADPARKINGLIST });
     }, 1000);
        // fetch().then() => dispatch in promise 
    }
}


