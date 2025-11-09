import React, { useState } from 'react';
import Card from './components/Card';
import './App.css';

interface DataItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const initialData: DataItem[] = [
  {
    id: 1,
    title: 'Module Federation',
    description: 'Share code between independently deployed applications',
    icon: '🔗',
  },
  {
    id: 2,
    title: 'Vite',
    description: 'Next generation frontend tooling with lightning-fast HMR',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'JavaScript with syntax for types and better developer experience',
    icon: '📘',
  },
];

function App() {
  const [items] = useState<DataItem[]>(initialData);

  return (
    <div className="remote2-app">
      <div className="remote-badge remote-badge--2">Remote 2</div>
      <h2>Data Display Microfrontend</h2>
      <p className="description">
        This microfrontend demonstrates shared Card components
      </p>

      <div className="cards-grid">
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="info-box">
        <h3>Exposed Components:</h3>
        <ul>
          <li><code>./App</code> - This data display application</li>
          <li><code>./Card</code> - Shared Card component</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
