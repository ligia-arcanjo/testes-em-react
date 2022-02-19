import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('rota-nao-existente');
  });

  it('Verifica se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      const titleEl = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });
      const emojiEl = screen.getByText(/😭/i);

      expect(titleEl && emojiEl).toBeInTheDocument();
    });

  it('Verifica se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".',
    () => {
      const imageEl = screen.getAllByRole('img');

      expect(imageEl[1]).toHaveAttribute('src',
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      /* Source: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */
    });
});
