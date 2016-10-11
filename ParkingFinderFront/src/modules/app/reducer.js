import { handleActions } from 'redux-actions'
import { TOGGLE, SELECTMENU, UPDATEMENU } from './constants'

const initialState = {
	isOpen: false,
	selectedItem: "MenuOne",
	name: "Yao",
	url: "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png"
}

export default handleActions({
	[TOGGLE]: (state, action) => {
		const { isOpen } = state
		const newIsOpen = !isOpen

		return {
			...state,
			isOpen: newIsOpen
		}
	},
	[SELECTMENU]: (state, action) => {
		const { payload: { item } } = action

		return {
			...state,
			isOpen: false,
			selectedItem: item
		}

	},
	[UPDATEMENU]: (state, action) => {
		const { payload: { isOpen } } = action

		return {
			...state,
			isOpen: isOpen
		}
	},
}, initialState)