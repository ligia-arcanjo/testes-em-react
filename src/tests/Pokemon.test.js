import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const buttonFireEl = screen.getByRole('button', { name: /Fire/i });
      userEvent.click(buttonFireEl);

      // O nome correto do Pokémon deve ser mostrado na tela;
      const pokemonNameEl = screen.getByTestId('pokemon-name');
      expect(pokemonNameEl.textContent).toBe('Charmander');

      // O tipo correto do pokémon deve ser mostrado na tela;
      const pokemonTypeEl = screen.getByTestId('pokemon-type');
      expect(pokemonTypeEl.textContent).toBe('Fire');

      // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>;
      const pokemonWeightEl = screen.getByTestId('pokemon-weight');
      expect(pokemonWeightEl.textContent).toBe('Average weight: 8.5 kg');
      /* Source: https://stackoverflow.com/questions/68294919/testing-for-text-broken-up-by-multiple-elements-in-react-testing-library */

      // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite;
      const imagePokemonEl = screen.getByRole('img');
      expect(imagePokemonEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

      const imageAltTextEl = screen.getByAltText('Charmander sprite');
      expect(imageAltTextEl).toBeInTheDocument();
    });
});
