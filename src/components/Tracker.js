import React from 'react'
import moment from 'moment'

import displayTime from '../lib/displayTime'

const btnStyle = {
  padding: '10px 0',
  backgroundColor: '#ccc',
  color: '#333',
  border: 0,
  fontSize: 16,
  flex: 1,
  margin: 1,
}

const labelStyle = {
  textTransform: 'capitalize',
  padding: 0,
  paddingRight: 10,
  justifyContent: 'space-between',
  display: 'flex',
  alignItems: 'center',
}

const tabsStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
}

export default ({ moves }) => {
  return (
    <div style={{}}>
    {
      moves.map(move => (
        <div key={move.label}>
          <div style={labelStyle}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <svg style={{width: 40, height: 40}} viewBox="0 0 20 20">
                <path d="M8,8L12,8L10,12z" />
              </svg>
              <span style={{marginLeft: -8}}>{move.label}</span>
            </div>
            <span style={{color: "#ccc", fontSize: 13}}>{moment(move.lastTime).fromNow()}</span>
          </div>
          {
            move.expanded && (
              <div style={{backgroundColor: '#eee', padding: 10, boxShadow: 'inset 0px 5px 6px rgba(0,0,0,.06)'}}>
                {
                  move.dimensions.map(dimension => (
                    <div style={{padding: 10, }}>
                      <div style={{textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold', color: "#333"}}>{dimension.label}</div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      {
                        dimension.values.map(value => (
                          <button style={btnStyle} key={value}>
                            { dimension.unit === 'seconds' ? displayTime(value) : value}
                          </button>
                        ))
                      }
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      ))
    }
    </div>
  )
}
