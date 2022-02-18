import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js />', () => {
  it('Verifica se a página contém as informações sobre a Pokédex e dois parágrafos',
    () => {
      renderWithRouter(<About />);
      const paragraphEl1 = screen.getByText(/This application simulates a Pokédex/i);
      const paragraphEl2 = screen.getByText(
        /a digital encyclopedia containing all Pokémons/i,
      );
      const paragraphEl3 = screen.getByText(
        /One can filter Pokémons by type, and see more details for each one of them/i,
      );
      expect(paragraphEl1 && paragraphEl2 && paragraphEl3).toBeInTheDocument();
    });

  it('Verifica se a página contém um heading <h2> com o texto "About Pokédex.', () => {
    renderWithRouter(<About />);
    const titleEl = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
  });
});
