export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'


const initialState = [
  {
    label: 'F2H squats',
    history: [90, 90, 90, 0, 105, 105, 120],
    dimensions: [
      {
        label: 'reps',
        unit: 'reps',
        values: [
          15, 18, 21, 24,
        ],
      },
    ],
    lastTime: new Date(2017, 6, 8),
    expanded: false,
  },
  {
    label: 'wall handstand',
    history: [90, 90, 90, 0, 105, 105, 120],
    dimensions: [
      {
        label: 'time',
        unit: 'seconds',
        values: [
          90, 105, 120, 135, 150, 165, 180,
        ],
      },
    ],
    lastTime: new Date(2017, 5, 8),
    expanded: false,
  },
  {
    label: 'free handstand',
    history: [90, 90, 90, 0, 105, 105, 120],
    dimensions: [
      {
        label: 'time',
        unit: 'seconds',
        values: [
          90, 105, 120, 135, 150, 165, 180,
        ],
      },
    ],
    lastTime: new Date(2017, 4, 3).getTime(),
    expanded: false,
  },
  {
    label: 'hang',
    history: [90, 90, 90, 0, 105, 105, 120],
    dimensions: [
      {
        label: 'time',
        unit: 'seconds',
        values: [
          45, 60, 75, 90, 105, 120, 135,
        ],
      }
    ],
    lastTime: new Date(2016, 8, 8).getTime(),
    expanded: true,
  },
  {
    label: 'active pidgeon',
    history: [90, 90, 90, 0, 105, 105, 120],
    dimensions: [
      {
        label: 'reps',
        unit: 'reps',
        values: [
          8,9,10,11,12,13,14,15
        ],
      },
      {
        label: 'weight',
        unit: 'kg',
        values: [
          6, 5.5, 5, 4.5, 4, 3.5, 3,
        ],
      },
    ],
    lastTime: new Date(2017, 6, 6).getTime(),
    expanded: false,
  },
]

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
      }

    default:
      return state
  }
}



export const toggleDrawer = imageUrl => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DRAWER,
      imageUrl,
    })
  }
}

/*
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
}*/
