import {
    TOGGLE,
    SELECTMENU,
    UPDATEMENU,
    OPENMODAL,
    CLOSEMODAL,
    FBLOGIN,
    FBLOGOUT,
    OPENREGISTERVEHICLEFORM,
    UPDATEFORMFIELD,
    REGISTERVEHICLE,
} from './constants'
import api from './api/api'

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

  return api.inspectFBAccessToken(
      accessToken,
      ( payload ) => {
        dispatch({
          type: FBLOGIN,
          payload
        })
      }
  );
};

export const onLogout = (accessToken, dispatch) => {
  return api.logout(
      accessToken,
      () => {
        dispatch({
          type: FBLOGOUT
        })
      }
  )
};

export const openRegisterVehicleForm = () => {
  return {
    type: OPENREGISTERVEHICLEFORM
  }
};

export const onTextFieldChanged = (key, value, dispatch) => {
    dispatch({
        type: UPDATEFORMFIELD,
        payload: {
            key,
            value
        }
    });
};

export const onRegisterVehicleSubmit = (userId, accessToken, data, dispatch) => {
    if (!(data.color && data.model && data.brand && data.year && data.plate)) {
        dispatch({
            type: REGISTERVEHICLE,
            payload: {
                error: 'Missing Argument'
            }
        })
    }
    else {
        const vehicle = {
            color: data.color,
            model: data.model,
            brand: data.brand,
            year: data.year,
            plate: data.plate,
        };
        api.registerVehicle(
            userId,
            accessToken.accessToken,
            vehicle,
            ( payload ) => {
                payload = payload || {};
                const _payload = Object.assign(payload, {
                    vehicle
                });
                dispatch({
                    type: REGISTERVEHICLE,
                    payload: _payload
                })
            }
        );
    }
};

