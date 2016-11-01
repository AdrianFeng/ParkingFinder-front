import { handleActions } from 'redux-actions'
import { TOGGLE, SELECTMENU, UPDATEMENU, OPENMODAL, CLOSEMODAL, FBLOGIN } from './constants'

const initialState = {
	isOpen: false,
	selectedItem: "default",
	name: "Yao Zhang",
	url: "https://breakinggeek.files.wordpress.com/2013/11/c0a80f0578993697efb53100a772f162.png",
	myInfoVisible: false,
	historyVisible: false,
    helpVisible: false,
    settingsVisible: false,
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
	[OPENMODAL]: (state, action) => {
		const { selectedItem } = state

		switch(selectedItem) {
			case "MY INFO": 
				return {
					...state,
					myInfoVisible: true
				}
				break;
			case "HISTORY": 
				return {
					...state,
					historyVisible: true
				}
				break;
			case "HELP": 
				return {
					...state,
					helpVisible: true
				}
				break;
			case "SETTINGS": 
				return {
					...state,
					settingsVisible: true
				}
				break;
			default: 
				return {
					...state,
				}
				break;
		}
	},
	[CLOSEMODAL]: (state, action) => {
		return {
			...state,
			myInfoVisible: false,
			historyVisible: false,
			helpVisible: false,
			settingsVisible: false,
			selectedItem: "default",
		}
	},
	[FBLOGIN]: (state, action) => {
		const { payload } = action;
		if (payload.error) {
			return {
				...state,
				error: payload.error.message,
				accessToken: null,
			}
		} else {
			return {
				...state,
				accessToken: payload.accessToken,
				user: payload.user
			}
		}
	}
}, initialState)