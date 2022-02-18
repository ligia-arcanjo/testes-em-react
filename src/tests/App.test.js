import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  test('Verifica se a página inicial contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', { name: /Home/i });
    const aboutLinkEl = screen.getByRole('link', { name: /About/i });
    const favoriteLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(homeLinkEl && aboutLinkEl && favoriteLinkEl).toBeInTheDocument();
  });
});
