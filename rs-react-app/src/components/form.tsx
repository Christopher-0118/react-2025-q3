import { Component, type ChangeEvent, type FormEvent } from 'react';
import type { IFormState, IFormProps } from '../type';

class Form extends Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    this.state = {
      query: props.defaultValue || '',
    };
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <form className="control-panel" onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="search-input"
          value={this.state.query}
          placeholder="Looking for smth?"
        ></input>
        <input type="submit" className="search-button" value="Search"></input>
      </form>
    );
  }
}

export default Form;
