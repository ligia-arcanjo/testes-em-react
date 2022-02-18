import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js />', () => {
  it('Verifica se a página contém um heading <h2> com o texto "About Pokédex".', () => {
    renderWithRouter(<About />);
    const titleEl = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
  });
});
