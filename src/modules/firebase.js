// Initialize Firebase
export const LOAD_CURRICULUM = 'LOAD_CURRICULUM'

export default (state, action) => {
  /*switch(action.type) {

  }*/
  return {
    //database
  };
}

export const loadCurriculum = () => {
  //console.log("DO I HAVE STATE", state, imageUrl)
  return (dispatch, getState) => {
    const { database } = getState().firebase

    database.ref('/defaultGame/').once('value').then(snapshot => {
      console.log('my snapshot!!', snapshot.val())
    });

    return dispatch({
      type: 'SET_IMAGE',
      imageUrl: 'xxx',
    })
  };
}
