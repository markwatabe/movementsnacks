// Initialize Firebase
export const LOAD_CURRICULUM = 'LOAD_CURRICULUM'

const API_KEY = process.env.REACT_APP_FIREBASE_WEB_API_KEY
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "movement-626f8.firebaseapp.com",
  databaseURL: DATABASE_URL,
  projectId: "movement-626f8",
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
};
window.firebase.initializeApp(firebaseConfig)
const database = window.firebase.database()

export default (state, action) => {
  /*switch(action.type) {

  }*/
  return {
    database
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
