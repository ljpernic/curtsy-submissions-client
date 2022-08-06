//////// DOES THINGS SELECTIVELY BASED ON THE PAGE STATE -- CONTEXT PASSED IN TO OTHER PAGES ////////

import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'                // Imports functions from react.
import {                                                                        // Imports variables from the actions.js file.
  SET_LOADING,
  ADD_READER_SUCCESS,
  ADD_READER_ERROR,
  LOGOUT_READER,
  SET_READER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from './actions'
import reducer from './reducer'                                                // Imports reducer function from the reducer.js file.

const initialState = {                                                         // Sets initial state values of the app, with everything turned off 
  reader: null,                                                                //// and no one logged in.
  role: null,
  isLoading: false,
  jobs: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
}
const AppContext = React.createContext()                                      // Let's you create new context to overwrite the initial state.

const AppProvider = ({ children }) => {                                       // Umbrella function containing all of the other functions (add reader, login, etc)
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // ADD READER //
  const addReader = async (readerInput) => {                                    // Establishes readerInput as data to be passed in,
    setLoading()
    try {
      const { data } = await axios.post(`/auth/add-reader`, {                  //// set up to be what the reader posts through /auth/add-reader. 
        ...readerInput,
      })
//      console.log(`Client-side app-context from addReader: ` + data)          // Shows what data is visible on the client side.
      dispatch({ type: ADD_READER_SUCCESS, payload: data.reader.name })    // If it works, it sets the name variable of the reader,
      localStorage.setItem(                                                 //// puts it in the local browser storage, and
        'reader',
        JSON.stringify({ name: data.reader.name, token: data.token })         //// stringifies it together with the token.
      )
      } catch (error) {                                                       //// Otherwise, it throws an error.
      dispatch({ type: ADD_READER_ERROR })
    }
  }

  // LOGIN
  const login = async (readerInput) => {                                      // Establishes readerInput as data to be passed in,
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {                    //// set up to be what the reader posts through /auth/login.
        ...readerInput,
      })
//      console.log(`Client-side app-context from login: ` + JSON.stringify(data.reader))          // Shows what data is visible on the client side.
      const loginPayload = [data.reader.name, data.reader.role]
//      console.log(`Client-side app-context role: ` + loginPayload[0])          // Shows what data is visible on the client side.
//      console.log(`Client-side app-context role: ` + loginPayload[1])          // Shows what data is visible on the client side.
      dispatch({ type: ADD_READER_SUCCESS, payload: loginPayload })    // If it works, it sets the name variable of the reader, 
      localStorage.setItem(                                                 //// puts it in the local browser storage, and
        'reader',
        JSON.stringify({ name: data.reader.name, token: data.token }),         //// stringifies it together with the token.
        ) 
    } catch (error) {                                                       //// Otherwise, it throws an error.
      dispatch({ type: ADD_READER_ERROR })
    }
  }

  // LOGOUT
  const logout = () => {                                                    // Removes the reader data.
    localStorage.removeItem('reader')
    dispatch({ type: LOGOUT_READER })
  }

  // FETCH JOBS
  const fetchJobs = async () => {                                           // Fetches jobs. This is what will become submissions?
    setLoading()
    try {
      const { data } = await axios.get(`/jobs`)
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR })
      logout()
    }
  }

  // CREATE JOB
  const createJob = async (readerInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/jobs`, {
        ...readerInput,
      })
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR })
    }
  }

  // DELETE JOB //
  const deleteJob = async (jobId) => {
    setLoading()
    try {
      await axios.delete(`/jobs/${jobId}`)

      fetchJobs()
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR })
    }
  }

  // GET JOB //

  const fetchSingleJob = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs/${jobId}`)
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR })
    }
  }

  // EDIT JOB //
  const editJob = async (jobId, readerInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...readerInput,
      })
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR })
    }
  }

  useEffect(() => {
    const reader = localStorage.getItem('reader')
    if (reader) {
      const newReader = JSON.parse(reader)
      dispatch({ type: SET_READER, payload: newReader.name })
    }
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        addReader,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// 
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
