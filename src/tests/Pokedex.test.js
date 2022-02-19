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
});
