import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { ChromePicker } from 'react-color'
import TransparentPattern from './transparent_pattern.png'
import reactCSS from 'reactcss'

import ColorThief from 'color-thief-standalone'

// Image states
const NOT_LOADED = 'NOT_LOADED'
const LOADING = 'LOADING'
const LOADED = 'LOADED'
const ERRORED = 'ERRORED'

// Display modes
const FIT = 'FIT'
const FULL_BLEED = 'FULL_BLEED'

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobUrl: null,
      imgWidth: null,
      imgHeight: null,
      inputUrl: null,
      imgStatus: NOT_LOADED,
      displayMode: FULL_BLEED,
      backgroundColor: '#ccc',
      displayColorPicker: false,
    };
    this._getNewImageSize = this._getNewImageSize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('paste', e => {
      this.setState({
        imgStatus: LOADING,
        imgWidth: null,
        imgHeight: null,
      })
      // This option is async for some bizzare reason
      if (e.clipboardData.items[0].kind === 'string') {
        e.clipboardData.items[0].getAsString(s => {
          this.setState({
            blobUrl: s,
            imgStatus: LOADED,
          })
        })
      } else if (e.clipboardData.items[0].kind === 'file') {
        const blob = e.clipboardData.items[0].getAsFile()
        const URLObj = window.URL || window.webkitURL
        this.setState({
          blobUrl: URLObj.createObjectURL(blob),
          imgStatus: LOADED,
        })
      }
    })
  }

  _getNewImageSize() {
    const { width, height } = this.props
    const { imgWidth, imgHeight } = this.state
    const aspectRatio = height / width
    const size = {
      width: null,
      height: null,
    }
    if (!imgWidth) {
      return size
    }
    const newImageAspectRatio = imgHeight / imgWidth
    const ratioIsBigger = newImageAspectRatio > aspectRatio
    if (this.state.displayMode === FULL_BLEED) {
      size.width = Math.round(ratioIsBigger ? width : height / newImageAspectRatio)
      size.height = Math.round(ratioIsBigger ? width * newImageAspectRatio : height)
      size.left = ratioIsBigger ? 0 : width / 2 - (height / newImageAspectRatio) / 2
      size.top = ratioIsBigger ? height / 2 - (width * newImageAspectRatio) / 2 : 0
    } else if (this.state.displayMode === FIT) {
      size.width = Math.round(ratioIsBigger ? height / newImageAspectRatio : width)
      size.height = Math.round(ratioIsBigger ? height : width * newImageAspectRatio)
      size.left = ratioIsBigger ? width / 2 - ((height / newImageAspectRatio) / 2) : 0
      size.top = ratioIsBigger ? 0 : height / 2 - (width * newImageAspectRatio / 2)
    }
    return size
  }

  render() {
    const parentHeight = this.props.height
    const parentAspectRatio = parentHeight / this.props.width
    const imageAspectRatio = this.imgHeight ? this.imgHeight / this.imgWidth : 1
    const imageSize = this._getNewImageSize()
    const { backgroundColor } = this.state

    const styles = reactCSS({
      'default': {
        popover: {
          zIndex: 10, position: 'absolute', bottom: 30, right: 5,
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    let message = '';
    if (!this.state.blobUrl && this.state.imgStatus === NOT_LOADED) {
      message = 'Drag or Paste a url or image.'
    } else if (this.state.imgStatus === LOADING) {
      message = 'Loading'
    } else if (this.state.imgStatus === ERRORED) {
      message = <span>Drag or Paste a url or image.<br/>(That was not a valid image)</span>
    }
    console.log('message', message, this.state.imgStatus, this.state.displayColorPicker)
    return (
      <div tabIndex="0" style={{
        width: this.props.width,
        height: this.props.height,
        position: 'relative',
        margin: 120,
        backgroundImage: `url("${TransparentPattern}")`,
        backgroundRepeat: 'repeat',
        overflow: 'hidden',
      }}>
      <div style={{width: '100%', height: '100%', backgroundColor, position: 'relative' }}>
        {
          this.state.blobUrl && (

              <img
                ref={(node) => { this._img = node }}
                crossOrigin="Anonymous"
                src={this.state.blobUrl}
                style={{
                  ...imageSize,
                  position: 'absolute',
                  opacity: this.state.imgWidth ? 1 : 0,
                  transition: 'width .15s ease-out, height .15s ease-out, left .15s ease-out, top .15s ease-out',
                }}
                onLoad={ e => {

                  var colorThief = new ColorThief();
                  console.log(colorThief.getColor(this._img), colorThief.getPalette(this._img, 5));
                  const { width, height } = e.target
                  this.setState({
                    imgWidth: width,
                    imgHeight: height,
                    imgStatus: LOADED,
                  })
                }}
                onError={
                  e => {
                    this.setState({
                      imgStatus: ERRORED,
                      blobUrl: null,
                    })
                  }
                }
              />

          )
        }
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
        }}>
          <Dropzone
            ref={(node) => { this.dropzoneRef = node; }}
            disableClick
            style={{
              width: '100%',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
            onDrop={
              e => {
                this.setState({
                  imageStatus: LOADING,
                  blobUrl: e[0].preview,
                  imgWidth: null,
                  imgHeight: null,
                })
              }
            }
          >
            <p>{message}</p>
         </Dropzone>
         <div
           style={{
             width: '100%',
             position: 'absolute',
             bottom: 0,
             backgroundColor: 'rgba(0,0,0,.5)',
             display: 'flex',
             alignItems: 'center',
             left: 0,
             padding: 5,
             justifyContent: 'space-between',
             borderTop: '1px solid #fff',
           }}
         >
           <button
             className="btn-sm btn btn-default-outline"
             style={{
             }}
             onClick={() => this.dropzoneRef.open() }
           >
             Upload
           </button>
           <button
             onClick={
               () => {
                 this.setState({
                   displayMode: this.state.displayMode === 'FIT' ? 'FULL_BLEED' : 'FIT'
                 })
             }}
          >
            Size
          </button>
          <button
            onClick = {
              () => {
                console.log('huh')
                this.setState({ displayColorPicker: !this.state.displayColorPicker })
              }
            }
          >
            Color
          </button>

        </div>
      </div>

      {
        this.state.displayColorPicker && (
          <div style={ styles.popover }>
            <div
              style={ styles.cover }
              onClick={ () => {
                this.setState({ displayColorPicker: false })
              }}
            />
            <ChromePicker
              color={backgroundColor === 'transparent' ? '#000' : backgroundColor}
              onChange={
                color => {
                  const rgba = `rgba(${ color.rgb.r }, ${ color.rgb.g }, ${ color.rgb.b }, ${ color.rgb.a })`
                  console.log(rgba)
                  this.setState({ backgroundColor: rgba });
                }
              }
            />
          </div>
        )
      }
    </div>
    )
  }
}

export default Image
/*
color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
*/
