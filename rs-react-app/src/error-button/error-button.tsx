import { Component } from 'react';
import type { IErrorBoundaryState } from '../type';
import './error-button.css';

class ErrorButton extends Component<object, IErrorBoundaryState> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Manually triggered error!');
    }

    return (
      <input
        type="submit"
        className="error-button"
        onClick={this.handleClick}
        value={'Throw Error'}
      ></input>
    );
  }
}
export default ErrorButton;
