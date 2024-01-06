import {
	CLEAR_CART,
	CLEAR_ITEM,
	INCREASE,
	DECREASE,
	GET_TOTAL,
	DISPLAY_ITEMS,
	LOADING,
	DISPLAY_ERROR,
	TOGGLE_AMOUNT,
} from './actions'

const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] }
	}
	if (action.type === CLEAR_ITEM) {
		let newCart = state.cart.filter(item => item.id !== action.payload.id)
		return { ...state, cart: newCart }
	}

	// common dispatch for increase/decrease amount of items
	if (action.type === TOGGLE_AMOUNT) {
		let tempCart = state.cart
			.map(cartItem => {
				if (cartItem.id === action.payload.id) {
					if (action.payload.type === 'increase') {
						return { ...cartItem, amount: cartItem.amount + 1 }
					}
					if (action.payload.type === 'decrease') {
						return { ...cartItem, amount: cartItem.amount - 1 }
					}
				}
				return cartItem
			})
			.filter(cartItem => cartItem.amount !== 0)
		return {
			...state,
			cart: tempCart,
		}
	}
	// if (action.type === INCREASE) {
	// 	let tempCart = state.cart.map(cartItem => {
	// 		if (cartItem.id === action.payload) {
	// 			return { ...cartItem, amount: cartItem.amount + 1 }
	// 		}
	// 		return cartItem
	// 	})
	// 	return {
	// 		...state,
	// 		cart: tempCart,
	// 	}
	// }
	// if (action.type === DECREASE) {
	// 	let tempCart = state.cart
	// 		.map(cartItem => {
	// 			if (cartItem.id === action.payload) {
	// 				return { ...cartItem, amount: cartItem.amount - 1 }
	// 			}
	// 			return cartItem
	// 		})
	// 		.filter(cartItem => cartItem.amount !== 0)
	// 	return {
	// 		...state,
	// 		cart: tempCart,
	// 	}
	// }
	if (action.type === GET_TOTAL) {
		let { total, amount } = state.cart.reduce(
			(cartTotal, cartItem) => {
				const { price, amount } = cartItem
				const itemTotalPrice = price * amount // if we increase count of item we multiply their price by number of items

				cartTotal.total += itemTotalPrice
				cartTotal.amount += amount
				return cartTotal
			},
			{
				total: 0,
				amount: 0,
			}
		)
		total = parseFloat(total.toFixed(2)) // fix numbers after dot
		return {
			...state,
			total,
			amount,
		}
	}
	if (action.type === DISPLAY_ERROR) {
		return {
			...state,
			loading: false,
			error: true,
		}
	}
	if (action.type === LOADING) {
		return {
			...state,
			loading: true,
		}
	}
	if (action.type === DISPLAY_ITEMS) {
		return {
			...state,
			cart: action.payload,
			loading: false,
		}
	}
	// return state
	throw new Error(`No matching "${action.type}" - action type`)
}

export default reducer
