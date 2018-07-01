import React from 'react'

export default (props) => {
  return (
    <div className="ui floating dropdown labeled search icon button">
      <i className="building icon"></i>
      <span className="text company">Select city</span>
      <div id="selected-city"  className="menu">
        {props.cities ? props.cities.map((city, index) => {
          return (<div key={index} className="item">{city.city}</div>);
        }) : undefined}
      </div>
    </div>
  )
}