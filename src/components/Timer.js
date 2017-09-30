import React, { Component } from 'react'

import displayTime from '../lib/displayTime'

export default class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      totalTime: 0,
      _interval: null,
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: this.state._interval ? 0 : null,
          backgroundColor: '#fff',
          bottom: 0, left: 0, width: '100%',
          borderTop:  this.state._interval ? 0 : '1px solid #ccc'
        }}
      >
      <div style={{ display: 'flex', height: '100%'}}>
        {
          !this.state._interval && <button style={{width: 100}} onClick={
            () => {
              this.setState({
                time: 0,
              })
            }
          }>Reset Top</button>
        }
        <button style={{ flexGrow: 1 }}
          onClick={() => {
            if (this.state._interval) {
              window.clearInterval(this.state._interval)
              this.setState({
                _interval: null
              })
              return
            }

            const _interval = window.setInterval(() => {
              this.setState({
                time: this.state.time + 100,
                totalTime: this.state.totalTime + 100,
              })
            }, 100)
            this.setState({ _interval })
          }}
        >
          <div
            style={{
              fontSize: this.state._interval ? '4em' : '2em',
            }}
          >
            {displayTime(this.state.time / 1000, true)}
          </div>
          { !this.state._interval &&
            <div>
              {displayTime(this.state.totalTime / 1000, true)}
            </div>
          }
        </button>
        {
          !this.state._interval && (
            <button
              style={{width: 100}}
              onClick={
                () => {
                  this.setState({
                    time: 0,
                    totalTime: 0,
                  })
                }
              }

            >Reset All</button>
          )
        }
      </div>
      </div>
    )
  }
}
