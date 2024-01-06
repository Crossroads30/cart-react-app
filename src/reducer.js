import { CLEAR_CART, CLEAR_ITEM } from './actions'

const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] }
	}
	if (action.type === CLEAR_ITEM) {
		const newCart = state.cart.filter(item => item.id !== action.payload.id)
		return { ...state, cart: newCart }
	}
	return state
	// throw new Error(`No matching "${action.type}" - action type`)
}

export default reducer
