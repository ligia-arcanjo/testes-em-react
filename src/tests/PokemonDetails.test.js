import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const buttonPoisonEl = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(buttonPoisonEl);

    const linkEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkEl);
  });

  it('Verifica e as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
      const titleDetailsEl = screen.getByRole('heading',
        { name: /Ekans Details/i, level: 2 });
      expect(titleDetailsEl).toBeInTheDocument();

      // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
      const linkDetailsEl = screen.queryByRole('link', { name: /More details/i });
      expect(linkDetailsEl).toBeNull();

      // A seção de detalhes deve conter um heading h2 com o texto Summary.
      const titleSummaryEl = screen.getByRole('heading', { name: /Summary/i, level: 2 });
      expect(titleSummaryEl).toBeInTheDocument();

      // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
      const pokeEkansInfo = pokemons.find((pokemon) => pokemon.name === 'Ekans');
      const resumePokeEl = screen.getByText(pokeEkansInfo.summary);
      expect(resumePokeEl).toBeInTheDocument();
    });

  it('Verifica se existe na página a seção de mapas contendo as localizações do pokémon.',
    () => {
      // Deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
      const titleLocationEl = screen.getByRole('heading',
        { name: /Game Locations of Ekans/i, level: 2 });
      expect(titleLocationEl).toBeInTheDocument();

      // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
      // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes.
      const locations = (pokemons.find((pokemon) => pokemon.name === 'Ekans').foundAt);
      const locationEl = screen.getByText(locations[0].location);
      expect(locationEl).toBeInTheDocument();

      // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.
      // A imagem da localização deve ter um atributo src com a URL da localização;
      const imageMapEl = screen.getByAltText(/Ekans location/);
      expect(imageMapEl).toHaveAttribute('src', locations[0].map);
    });

/*
  Teste se o usuário pode favoritar um pokémon através da página de detalhes.
    > A página deve exibir um checkbox que permite favoritar o Pokémon;
    > Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    > O label do checkbox deve conter o texto Pokémon favoritado?;
*/
});
