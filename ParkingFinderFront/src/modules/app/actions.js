import { TOGGLE, SELECTMENU, UPDATEMENU } from './constants'

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