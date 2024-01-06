import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

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
