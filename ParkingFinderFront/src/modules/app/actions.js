import { TOGGLE, SELECTMENU, UPDATEMENU, OPENMODAL, CLOSEMODAL, FBLOGIN } from './constants'
import inspectFBAccessToken from './api/api'

export const toggleMenu = () => {
  return {
    type: TOGGLE,
  }
};

export const selectMenu = (item) => {
  return {
    type: SELECTMENU,
    payload: {
    	item
    }
  }
};

export const updateMenu = (isOpen) => {
  return {
    type: UPDATEMENU,
    payload: {
    	isOpen
    }
  }
};

export const closeModal = () => {
  return {
    type: CLOSEMODAL,
  }
};

export const openModal = () => {
  return {
    type: OPENMODAL,
  }
};

export const onFBLogin = (accessToken, dispatch) => {

  return inspectFBAccessToken(
      accessToken,
      ( payload ) => {
        dispatch({
          type: FBLOGIN,
          payload
        })
      }
  );
};