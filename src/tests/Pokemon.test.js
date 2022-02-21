import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it('Verifica se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
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

  it('Verifica se o card do Pokémon contém um link para exibir detalhes deste Pokémon.',
    () => {
      const charmanderInfo = pokemons.find((pokemon) => pokemon.name === 'Charmander');
      // Teste se o card contém um link de navegação para exibir detalhes deste Pokémon.
      // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
      renderWithRouter(<App />);
      const buttonFireEl = screen.getByRole('button', { name: /Fire/i });
      userEvent.click(buttonFireEl);

      const detailsLinkEl = screen.getByRole('link', { name: /More details/i });
      expect(detailsLinkEl).toHaveAttribute('href', `/pokemons/${charmanderInfo.id}`);
    });

  it('Verifica se ao clicar no link, redireciona para a página de detalhes do Pokémon',
    () => {
      const charmanderInfo = pokemons.find((pokemon) => pokemon.name === 'Charmander');
      const { history } = renderWithRouter(<App />);

      const buttonFireEl = screen.getByRole('button', { name: /Fire/i });
      userEvent.click(buttonFireEl);

      const detailsLinkEl = screen.getByRole('link', { name: /More details/i });
      userEvent.click(detailsLinkEl);

      // verifica se as informações detalhadas do pokemon são renderizadas na tela
      const detailsTitleEl = screen.getByRole('heading',
        { name: /Charmander Details/i, level: 2 });
      const summaryTitleEl = screen.getByRole('heading', { name: /Summary/i, level: 2 });
      const locationTitleEl = screen.getByRole('heading',
        { name: /Game Locations of Charmander/i, level: 2 });

      expect(detailsTitleEl && summaryTitleEl && locationTitleEl).toBeInTheDocument();

      // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
      expect(history.location.pathname).toEqual(`/pokemons/${charmanderInfo.id}`);
    });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetailsEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailsEl);

    const inputCheckEl = screen.getByRole('checkbox');
    userEvent.click(inputCheckEl);

    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    const starEl = screen.getAllByRole('img');
    expect(starEl[1]).toHaveAttribute('src', '/star-icon.svg');
    // A imagem deve ter o atributo alt igual a '<pokemon> is marked as favorite', onde <pokemon> é o nome do Pokémon exibido.
    const starAltEl = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starAltEl).toBeInTheDocument();
  });
});
