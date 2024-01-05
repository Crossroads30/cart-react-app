import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import { reducer } from './reducer'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [cart, setCart] = useState(cartItems)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

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
				setCart(data)
			} catch (error) {
				console.log(error)
			}
      setIsLoading(false)
		}
		fetchData()
	}, [])

	return (
		<AppContext.Provider
			value={{
				cart,
				isLoading,
				isError,
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
