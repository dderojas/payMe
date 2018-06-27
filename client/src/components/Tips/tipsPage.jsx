import React from 'react';
import TipsStatistic from './tipsStatistic.jsx';
import TipsListContainer from './tipsListContainer.jsx';

export default class TipsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ui column stackable center page grid'>
        <TipsStatistic/>
        <TipsListContainer/>
      </div>
    )
  }
};
