import { handleActions } from 'redux-actions'
import { TOGGLE, SELECTMENU, UPDATEMENU, OPENMODAL, CLOSEMODAL, SHOWPARKINGLIST, HIDEPARKINGLIST } from './constants'

const initialState = {
	isOpen: false,
	selectedItem: "default",
	name: "Yao Zhang",
	url: "https://breakinggeek.files.wordpress.com/2013/11/c0a80f0578993697efb53100a772f162.png",
	myInfoVisible: false,
	historyVisible: false,
    helpVisible: false,
    settingsVisible: false,
    AvailabeParkingListVisible: false,
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
	[SHOWPARKINGLIST]: (state, action) => {
		return {
			...state,
			AvailabeParkingListVisible: true
		}
	},
	[HIDEPARKINGLIST]: (state, action) => {
		return {
			...state,
			AvailabeParkingListVisible: false
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
}, initialState)