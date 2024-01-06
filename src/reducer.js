import { CLEAR_CART } from './actions'

const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] }
	}
	return state
	// throw new Error(`No matching "${action.type}" - action type`)
}

export default reducer
