import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se página contém um heading h2 com o texto "Encountered pokémons".',
    () => {
      const titleEl = screen.getByRole('heading', { name: /Encountered pokémons/i,
        level: 2 });
      expect(titleEl).toBeInTheDocument();
    });

  it('Verifica se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.',
    () => {
      // O botão deve conter o texto Próximo pokémon;
      const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(buttonNextPokemon).toBeInTheDocument();

      // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
      const pokemonsName = pokemons.map((pokemon) => pokemon.name);
      pokemonsName.forEach((pokeName, index) => {
        if (index > 0) {
          userEvent.click(buttonNextPokemon);
          const textPokemonName = screen.getByText(pokeName);
          expect(textPokemonName).toBeInTheDocument();
        }
        // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
        if (index === pokemonsName.length - 1) {
          userEvent.click(buttonNextPokemon);
          const firstPokemonEl = screen.getByText(/Pikachu/i);
          expect(firstPokemonEl).toBeInTheDocument();
        }
      });
    });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonNameEl = screen.getAllByTestId('pokemon-name');
    const pokemonTypeEl = screen.getAllByTestId('pokemon-type');
    const pokemonWeighEl = screen.getAllByTestId('pokemon-weight');
    expect(pokemonNameEl && pokemonTypeEl && pokemonWeighEl).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    const buttonNextPokemon = screen.getByTestId('next-pokemon');

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const NUMBER_OF_TYPES = 7;
    const buttonFilterEl = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilterEl).toHaveLength(NUMBER_OF_TYPES);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    const buttonEletricEl = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(buttonEletricEl);
    const pokeEletricEl = screen.getByText(/Pikachu/i);
    expect(pokeEletricEl).toBeInTheDocument();
    expect(buttonNextPokemon).toBeDisabled();

    const buttonFireEl = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFireEl);
    const pokeFireEl1 = screen.getByText(/Charmander/i);
    expect(pokeFireEl1).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    const pokeFireEl2 = screen.getByText(/Rapidash/i);
    expect(pokeFireEl2).toBeInTheDocument();

    const buttonBugEl = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(buttonBugEl);
    const pokeBugEl = screen.getByText(/Caterpie/i);
    expect(pokeBugEl).toBeInTheDocument();
    expect(buttonNextPokemon).toBeDisabled();

    // O botão All precisa estar sempre visível.
    const buttonAllEl = screen.getByRole('button', { name: /All/i });
    expect(buttonAllEl).toBeInTheDocument();
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    // Ao carregar a página, o filtro selecionado deverá ser All;
    // O texto do botão deve ser All;
    const buttonAllEl = screen.getByRole('button', { name: /All/i });
    expect(buttonAllEl).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    const buttonBugEl = screen.getByRole('button', { name: /Bug/i });
    const buttonNextPokemon = screen.getByTestId('next-pokemon');

    userEvent.click(buttonBugEl);
    userEvent.click(buttonAllEl);

    const pokemonsName = pokemons.map((pokemon) => pokemon.name);
    pokemonsName.forEach((pokeName, index) => {
      if (index > 0) {
        userEvent.click(buttonNextPokemon);
        const textPokemonName = screen.getByText(pokeName);
        expect(textPokemonName).toBeInTheDocument();
      }
    });
  });
});
