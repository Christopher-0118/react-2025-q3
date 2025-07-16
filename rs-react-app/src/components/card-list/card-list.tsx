import { Component } from 'react';
import type { IResultProps } from '../../type';
import Card from '../card/card';
import './card-list.css';

class CardList extends Component<IResultProps> {
  render() {
    return (
      <div className="card-list">
        <div className="item">
          <strong>Item</strong>
          <strong>Description</strong>
        </div>
        {this.props.results.map((item, index) => (
          <Card key={index} name={item.name} description={item.description} />
        ))}
      </div>
    );
  }
}

export default CardList;
