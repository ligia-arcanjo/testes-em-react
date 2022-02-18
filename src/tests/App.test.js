import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('Verifica se a página inicial contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', { name: /Home/i });
    const aboutLinkEl = screen.getByRole('link', { name: /About/i });
    const favoriteLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(homeLinkEl && aboutLinkEl && favoriteLinkEl).toBeInTheDocument();
  });

  it('Verifica se é redirecionado para / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', { name: /Home/i });

    userEvent.click(homeLinkEl);
    expect(history.location.pathname).toEqual('/');
  });

  it('Verifica se é redirecionado para /about ao clicar no link About.', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', { name: /About/i });

    userEvent.click(aboutLinkEl);
    expect(history.location.pathname).toEqual('/about');
  });

  it('Verifica se é redirecionado para /favorites ao clicar no link Favorite.', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLinkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favoriteLinkEl);
    expect(history.location.pathname).toEqual('/favorites');
  });
});
