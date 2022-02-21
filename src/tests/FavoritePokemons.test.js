import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido "No favorite pokemon found", quando não há favoritos.',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const textEl = screen.getByText(/No favorite pokemon found/i);
      expect(textEl).toBeInTheDocument();
    });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetailsEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailsEl);

    const textFavoritePoke = screen.getByText(/Pokémon favoritado?/i);
    expect(textFavoritePoke).toBeInTheDocument();

    const inputCheckEl = screen.getByRole('checkbox');
    userEvent.click(inputCheckEl);

    const favoriteLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLinkEl);

    const textPokemonFavEl = screen.getByText(/Pikachu/i);
    expect(textPokemonFavEl).toBeInTheDocument();
  });
});
