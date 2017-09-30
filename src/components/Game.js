import React from 'react';
console.log('loaded it!!!')
export default ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
    <ShowImageComponent />
  </div>
)


const ShowImageComponent = () => {
  return (

    //img: 'https://firebasestorage.googleapis.com/v0/b/osopagu.appspot.com/o/hug.jpg?alt=media&token=920fe16c-9260-4e92-b0af-9500a43d68d3',

  )
}
