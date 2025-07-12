import { Component } from 'react';
import type { IAppState } from './type';
import './App.css';
import Form from './components/form';

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    const savedQuery: string = localStorage.getItem('searchQuery') || '';

    this.state = {
      searchQuery: savedQuery,
      results: [],
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchData(this.state.searchQuery);
    console.log('we were there');
  }

  fetchData = async (query: string) => {
    try {
      const url: string = query.trim()
        ? `https://pokeapi.co/api/v2/${query.trim()}/`
        : `https://pokeapi.co/api/v2/ability/?limit=20&offset=20`;

      const result = await fetch(url);

      if (!result.ok) throw new Error(`error: ${result.status}`);

      const data = await result.json();
      console.log(data.results);
    } catch (e: unknown) {
      if (e instanceof Error) this.setState({ error: e.message });
    }
  };

  handleSubmit = (query: string): void => {
    console.log(query);
    this.fetchData('');
  };

  render() {
    return (
      <>
        <header className="header">
          <Form
            onSubmit={this.handleSubmit}
            defaultValue={this.state.searchQuery}
          />
        </header>
        <main className="main">
          <div className="result-panel">
            <div className="item">
              <div className="items-name"></div>
              <div className="items-description"></div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
