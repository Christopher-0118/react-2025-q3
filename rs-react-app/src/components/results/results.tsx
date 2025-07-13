import { Component } from 'react';
import type { IResultProps } from '../../type';
import './results.css';

class Results extends Component<IResultProps> {
  render() {
    return (
      <>
        <div className="item">
          <strong>Item</strong>
          <strong>Description</strong>
        </div>
        {this.props.results.map((item, index) => (
          <div key={index} className={'item'}>
            <p>{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Results;
