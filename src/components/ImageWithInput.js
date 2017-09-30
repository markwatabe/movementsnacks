import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

class Image extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blobUrl: null,
      imgWidth: null,
      imgHeight: null,
      inputUrl: null,
      isLoading: false,
    };

    window.addEventListener("paste", e => {
      if (e.clipboardData.items[0].kind == 'string') {
        e.clipboardData.items[0].getAsString(s => {
          this.setState({
            blobUrl: s,
          })
        })
      }

      //console.log('huh', e.clipboardData.items[0].getAsString(s => ), e.clipboardData.items[0].getAsFile()  ); //.items);//, e.items.length)
      /*e.clipboardData.items.forEach( i => {
        console.log(i, "ASDFASFS")
      })*/
      // for (var i = 0; i < items.length; i++) {
    }); //chrome
  }

/*
var items = e.clipboardData.items;
   if(items == undefined) return false;
   for (var i = 0; i < items.length; i++) {
       if (items[i].type.indexOf("image") == -1) continue; //not image
       var blob = items[i].getAsFile();
       var URLObj = window.URL || window.webkitURL;
       var source = URLObj.createObjectURL(blob);
       paste_createImage(source);
       }
       */

  render() {

    const parentAspectRatio = this.props.height / this.props.width
    const imageAspectRatio = this.imgHeight ? this.imgHeight / this.imgWidth : 1

    return (
      <div tabIndex="0" style={{
        width: this.props.width,
        height: this.props.height,
        position: 'relative',
        margin: 40,
      }}>
        {
          this.state.blobUrl && (
            <div style={{
              display: 'flex',
              backgroundColor: '#000',
              alignItems: 'center',
              alignContent: 'center',
              height: '100%',
              flexDirection: parentAspectRatio < imageAspectRatio ? 'column' : 'row',
            }}>
              <img

                crossOrigin="Anonymous"
                src={this.state.blobUrl}
                style={{
                  width: this.state.imgWidth,
                  height: this.state.imgHeight,
                  opacity: this.state.isLoading ? 0 : 1,
                }}
                onLoad={ e => {
                  const { width, height } = e.target
                  const newImageAspectRatio = height / width
                  const imgWidth = newImageAspectRatio > parentAspectRatio ? this.props.height / newImageAspectRatio : this.props.width
                  const imgHeight = newImageAspectRatio > parentAspectRatio ? this.props.height : this.props.width * newImageAspectRatio
                  console.log('hmm, never works')
                  this.setState({
                    imgWidth,
                    imgHeight,
                    isLoading: false,
                  })
                }}
              />
            </div>
          )
        }
        {
          (!this.state.blobUrl || (this.state.blobUrl && this.state.isLoading)) && <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#eee",
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            opacity: .5,
            boxSizing: 'border-box',
          }}>
            <div style={{display: 'flex'}}>
              <input
                onChange={ e => {
                  this.setState({
                    inputUrl: e.target.value,
                  })
                }}
                placeholder="Enter a url"
                style={{
                  padding: 5,
                  fontSize: 14,
                  flexGrow: 1,
                  border: '1px solid #ccc',

                }}
              />
              <button
                style={{
                  marginLeft: 10,
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  fontSize: 14,
                  height: 32,
                }}
                onClick={
                  () => {
                    this.setState({
                      blobUrl: this.state.inputUrl,
                      isLoading: true,
                    })
                  }
                }
              >Get Image</button>
            </div>
            <p style={{fontSize: 12, fontWeight: 'bold'}}>OR</p>
            <Dropzone
              style={{
                backgroundColor: '#e3e3e3',
                border: '2px dashed #ccc',
                width: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
              onDrop={
                e => {

                  this.setState({
                    isLoading: true,
                    blobUrl: e[0].preview,
                  })
                }
              }
            >
              <p>Click or drag a file here to upload.</p>
           </Dropzone>
           </div>
        }
        {
          this.state.isLoading && (
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, .5)',
                position: 'absolute',
              }}
            >LOADING</div>
          )
        }
      </div>
    )
  }
}

export default Image
