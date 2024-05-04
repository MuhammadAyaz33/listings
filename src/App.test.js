import { render } from '@testing-library/react';
import App from './App';

test('<App>', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
