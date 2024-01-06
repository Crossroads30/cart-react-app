import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
import {
	CLEAR_CART,
	CLEAR_ITEM,
	INCREASE,
	DECREASE,
	GET_TOTAL,
	DISPLAY_ITEMS,
	LOADING,
	DISPLAY_ERROR,
} from './actions'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
	loading: false,
	error: false,
	cart: [],
	total: 0,
	amount: 0,
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const clearCart = () => {
		dispatch({ type: CLEAR_CART })
	}

	const clearItem = id => {
		dispatch({ type: CLEAR_ITEM, payload: { id } })
		// dispatch({ type: CLEAR_ITEM, payload: id  }) // we can pass 'payload' as 'id', not as the obj with 'id'
	}

	const increase = id => {
		dispatch({ type: INCREASE, payload: id })
	}

	const decrease = id => {
		dispatch({ type: DECREASE, payload: id })
	}

	const fetchData = async () => {
		try {
			const response = await fetch(url)
			dispatch({ type: LOADING })
			
			if (!response.ok) {
				// case for 'fetch' to handle '400th' & '500th' errors!
				dispatch({ type: DISPLAY_ERROR })
				return
			}
			const cart = await response.json()
			dispatch({ type: DISPLAY_ITEMS, payload: cart })
			// console.log(data)
		} catch (error) {
			console.log(error)
			dispatch({ type: DISPLAY_ERROR })
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		dispatch({ type: GET_TOTAL })
	}, [state.cart])

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				clearItem,
				increase,
				decrease,
				fetchData,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
