import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
import { CLEAR_CART, CLEAR_ITEM } from './actions'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
	loading: false,
	error: false,
	cart: cartItems,
	total: 0,
	amount: 0,
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const clearCart = () => {
		dispatch({ type: CLEAR_CART })
	}
	const clearItem = (id) => {
		dispatch({ type: CLEAR_ITEM, payload: { id } })
		// dispatch({ type: CLEAR_ITEM, payload: id  }) // we can pass 'payload' as 'id', not as the obj with 'id'
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				if (!response.ok) {
					// case for 'fetch' to handle '400th' & '500th' errors!
					setIsError(true)
					setIsLoading(false)
					return
				}
				const data = await response.json()
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [])

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				clearItem,
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
