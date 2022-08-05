//////// Sets the state based on what action happens (if adding the reader is successful, if jobs are found, etc). ////////

import {
  ADD_READER_SUCCESS,
  ADD_READER_ERROR,
  SET_READER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  LOGOUT_READER,
  SET_LOADING,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
} from './actions'

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false }
  }

  if (action.type === ADD_READER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reader: action.payload,
    }
  }
  if (action.type === ADD_READER_ERROR) {
    return {
      ...state,
      isLoading: false,
      reader: null,
      showAlert: true,
    }
  }

  if (action.type === SET_READER) {
    return { ...state, reader: action.payload }
  }
  if (action.type === LOGOUT_READER) {
    return {
      ...state,
      reader: null,
      showAlert: false,
      jobs: [],
      isEditing: false,
      editItem: null,
    }
  }

  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editItem: null,
      singleJobError: false,
      editComplete: false,
      jobs: action.payload,
    }
  }
  if (action.type === FETCH_JOBS_ERROR) {
    return { ...state, isLoading: false }
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: [...state.jobs, action.payload],
    }
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    }
  }

  if (action.type === FETCH_SINGLE_JOB_SUCCESS) {
    return { ...state, isLoading: false, editItem: action.payload }
  }
  if (action.type === FETCH_SINGLE_JOB_ERROR) {
    return { ...state, isLoading: false, editItem: '', singleJobError: true }
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      editItem: action.payload,
    }
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      editComplete: true,
      showAlert: true,
    }
  }
  throw new Error(`no such action : ${action}`)
}

export default reducer
