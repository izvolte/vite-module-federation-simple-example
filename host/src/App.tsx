import React, { Suspense, useState } from 'react';
import './App.css';

const Remote1App = React.lazy(() => import('remote1/App'));
const Remote2App = React.lazy(() => import('remote2/App'));
const Remote3App = React.lazy(() => import('remote3/App'));
const Button = React.lazy(() => import('remote1/Button'));
const Card = React.lazy(() => import('remote2/Card'));
const Badge = React.lazy(() => import('remote3/Badge'));

function App() {
  const [message, setMessage] = useState('Click a button below!');

  return (
    <div className="host-app">
      <header className="host-header">
        <h1>🏠 Host Application</h1>
        <p>Module Federation 2.0 with Vite + TypeScript + React</p>
      </header>

      <main className="microfrontends-container">
        {/* Shared Components Section */}
        <section className="microfrontend-section full-width">
          <div className="section-header">
            <h2>🔗 Shared Components Example</h2>
          </div>
          <div className="microfrontend-content">
            <div className="shared-demo">
              <p className="demo-message">{message}</p>

              <div className="demo-section">
                <h3>Buttons from Remote 1:</h3>
                <div className="button-group">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Button onClick={() => setMessage('Primary button clicked!')} variant="primary">
                      Primary
                    </Button>
                    <Button onClick={() => setMessage('Secondary button clicked!')} variant="secondary">
                      Secondary
                    </Button>
                    <Button onClick={() => setMessage('Danger button clicked!')} variant="danger">
                      Danger
                    </Button>
                  </Suspense>
                </div>
              </div>

              <div className="demo-section">
                <h3>Cards from Remote 2 (React):</h3>
                <div className="cards-grid-demo">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Card
                      title="Shared Component"
                      description="This Card component is imported from Remote 2"
                      icon="🎨"
                    />
                    <Card
                      title="Cross-App Reuse"
                      description="Components can be shared across different microfrontends"
                      icon="♻️"
                    />
                  </Suspense>
                </div>
              </div>

              <div className="demo-section">
                <h3>Badges from Remote 3 (Vue):</h3>
                <div className="button-group">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Badge count={5} label="React" color="blue" />
                    <Badge count={3} label="Vue" color="green" />
                    <Badge count={8} label="Shared" color="orange" />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="microfrontend-section">
          <div className="section-header">
            <h2>Remote 1 Microfrontend</h2>
          </div>
          <div className="microfrontend-content">
            <Suspense fallback={<div className="loading">Loading Remote 1...</div>}>
              <Remote1App />
            </Suspense>
          </div>
        </section>

        <section className="microfrontend-section">
          <div className="section-header">
            <h2>Remote 2 Microfrontend (React)</h2>
          </div>
          <div className="microfrontend-content">
            <Suspense fallback={<div className="loading">Loading Remote 2...</div>}>
              <Remote2App />
            </Suspense>
          </div>
        </section>

        <section className="microfrontend-section">
          <div className="section-header">
            <h2>Remote 3 Microfrontend (Vue)</h2>
          </div>
          <div className="microfrontend-content">
            <Suspense fallback={<div className="loading">Loading Remote 3...</div>}>
              <Remote3App />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
