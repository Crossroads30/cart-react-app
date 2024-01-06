import { CLEAR_CART, CLEAR_ITEM, INCREASE, DECREASE } from './actions'

const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] }
	}
	if (action.type === CLEAR_ITEM) {
		let newCart = state.cart.filter(item => item.id !== action.payload.id)
		return { ...state, cart: newCart }
	}
	if (action.type === INCREASE) {
		let tempCart = state.cart.map(cartItem => {
			if (cartItem.id === action.payload) {
				return { ...cartItem, amount: cartItem.amount + 1 }
			}
			return cartItem
		})
		return {
			...state,
			cart: tempCart,
		}
	}
	if (action.type === DECREASE) {
		let tempCart = state.cart
			.map(cartItem => {
				if (cartItem.id === action.payload) {
					return { ...cartItem, amount: cartItem.amount - 1 }
				}
				return cartItem
			})
			.filter(
				cartItem => cartItem.amount !== 0
			)
		return {
			...state,
			cart: tempCart,
		}
	}
	return state
	// throw new Error(`No matching "${action.type}" - action type`)
}

export default reducer
