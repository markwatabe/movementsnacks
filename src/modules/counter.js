export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'
export const SET_IMAGE = 'SET_IMAGE'
export const RETRIEVE_IMAGE = 'RETRIEVE_IMAGE'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  imageUrl: null,
  webImageUrl: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return {
        ...state,
        imageUrl: action.imageUrl,
      }

    case RETRIEVE_IMAGE:
      return {
        ...state,
        webImageUrl: state.imageUrl,
      }

    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const setImage = imageUrl => {
  return dispatch => {
    dispatch({
      type: SET_IMAGE,
      imageUrl,
    })
  }
}

export const retrieveImage = () => {
  return dispatch => {
    dispatch({
      type: RETRIEVE_IMAGE,
    })
  }
}


export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}
