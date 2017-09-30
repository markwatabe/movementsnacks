import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  setImage,
  retrieveImage,
} from '../../modules/counter'
import Image from '../../components/Image'


function getBase64Image() {
  const img = document.getElementById('boomer')
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");
    console.log('image size is', img.width, img.height)
    /*
    const blob = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    const storageRef = window.firebase.storage().ref();
    const mountainsRef = storageRef.child('mountains.jpg');
    console.log('what is the blob?', blob)
    mountainsRef.putString(blob, 'base64').then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    */
}

// ref={(input) => { this.gameImg = input }}
// e => { console.log ('ahhh yea, i got me some files!!!', e)
//blob:http://localhost:3000/585bbba5-8f02-44cd-aacc-bc81a503e420


const Home = props => (
  <div>
    <h1>Home</h1>
    <input
      onChange={ e => {
        console.log(e.target.value)
        props.setImage(e.target.value)
      }}
    />
    <button onClick={props.retrieveImage}
    >
      set image
    </button>
    {
      props.webImageUrl && (
        <img
          crossOrigin="Anonymous"
          id="boomer"
          src={props.webImageUrl}
          onLoad={getBase64Image}
        />
      )
    }
    <p>URL: {props.imageUrl}</p>
    <p>Count: {props.count}</p>
    <Image width={600} height={500} />
    <p>
      <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
    </p>
    <p>
      <button onClick={props.decrement} disabled={props.isDecrementing}>Decrementing</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
    </p>
    <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
  </div>
)

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  imageUrl: state.counter.imageUrl,
  webImageUrl: state.counter.webImageUrl,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  setImage,
  retrieveImage,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
