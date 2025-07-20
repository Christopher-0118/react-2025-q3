import { Component } from 'react';
import type { IResult } from '../../type';
import './card.css';

class Card extends Component<IResult> {
  render() {
    const { name, description } = this.props;
    return (
      <div className={'item'} data-testid="card">
        <p>{name}</p>
        <p>{description}</p>
      </div>
    );
  }
}

export default Card;
