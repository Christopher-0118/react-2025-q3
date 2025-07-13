import { Component } from 'react';
import './results.css';

class Result extends Component {
  render() {
    return (
      <div className="result-panel">
        <div className="item">
          <div className="items-name"></div>
          <div className="items-description"></div>
        </div>
      </div>
    );
  }
}

export default Result;
