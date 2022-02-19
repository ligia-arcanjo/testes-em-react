import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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
});
