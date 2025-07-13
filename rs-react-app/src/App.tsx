import { Component } from 'react';
import type { IAppState } from './type';
import './App.css';
import Form from './components/form/form';
import Result from './components/results/results';

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
    localStorage.setItem('searchQuery', query);
    this.setState({ searchQuery: query });
    //console.log(query);
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
          <Result />
        </main>
      </>
    );
  }
}

export default App;
