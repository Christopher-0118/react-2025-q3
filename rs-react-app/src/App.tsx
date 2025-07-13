import { Component } from 'react';
import type { IAppState, IResult } from './type';
import Form from './components/form/form';
import Results from './components/results/results';
import './App.css';

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    const savedQuery: string = localStorage.getItem('searchQuery') || '';

    this.state = {
      searchQuery: savedQuery,
      results: [],
      error: null,
      loading: false,
    };
  }

  componentDidMount(): void {
    this.fetchData(this.state.searchQuery);
  }

  fetchData = async (term: string) => {
    try {
      this.setState({ loading: true, error: null });

      const query = term.trim().toLowerCase();

      let results: IResult[] = [];

      if (!query) {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?');

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();
        const promises = data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const detailRes = await fetch(pokemon.url);
            const detailData = await detailRes.json();
            return {
              name: detailData.name,
              description: `Weight: ${detailData.weight}, Height: ${detailData.height}`,
            };
          }
        );
        results = await Promise.all(promises);
      } else {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!res.ok) throw new Error('Pokémon not found');

        const data = await res.json();
        results = [
          {
            name: data.name,
            description: `Weight: ${data.weight}, Height: ${data.height}`,
          },
        ];
      }

      this.setState({ results, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.setState({ error: error.message, loading: false });
    }
  };

  handleSubmit = (query: string): void => {
    localStorage.setItem('searchQuery', query);
    this.setState({ searchQuery: query });
    this.fetchData(query);
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
          {this.state.loading ? (
            <p>Loading...</p>
          ) : this.state.error ? (
            <p style={{ color: 'red' }}>{this.state.error}</p>
          ) : (
            <Results results={this.state.results} />
          )}
        </main>
      </>
    );
  }
}

export default App;
