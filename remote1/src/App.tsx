import { useState } from 'react';
import Button from './components/Button';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="remote1-app">
      <div className="remote-badge">Remote 1</div>
      <h2>Counter Microfrontend</h2>
      <p className="description">
        This is a shared component from Remote 1 that can be used across microfrontends
      </p>

      <div className="counter-container">
        <div className="counter-display">
          <span className="counter-label">Count:</span>
          <span className="counter-value">{count}</span>
        </div>

        <div className="button-group">
          <Button onClick={() => setCount(count - 1)} variant="danger">
            Decrement
          </Button>
          <Button onClick={() => setCount(0)} variant="secondary">
            Reset
          </Button>
          <Button onClick={() => setCount(count + 1)} variant="primary">
            Increment
          </Button>
        </div>
      </div>

      <div className="info-box">
        <h3>Exposed Components:</h3>
        <ul>
          <li><code>./App</code> - This counter application</li>
          <li><code>./Button</code> - Shared Button component</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
