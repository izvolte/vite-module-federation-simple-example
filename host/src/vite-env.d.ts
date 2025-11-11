/// <reference types="vite/client" />

declare module 'remote1/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'remote2/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'remote1/Button' {
  interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
  }
  const Button: React.ComponentType<ButtonProps>;
  export default Button;
}

declare module 'remote2/Card' {
  interface CardProps {
    title: string;
    description: string;
    icon?: string;
    footer?: React.ReactNode;
  }
  const Card: React.ComponentType<CardProps>;
  export default Card;
}

declare module 'remote3/App' {
  const App: React.ComponentType;
  export default App;
}

declare module 'remote3/Badge' {
  interface BadgeProps {
    count: number;
    label: string;
    color?: 'blue' | 'green' | 'red' | 'orange';
  }
  const Badge: React.ComponentType<BadgeProps>;
  export default Badge;
}

declare module 'remote3/BadgeWebComponent' {
  const BadgeWebComponent: any;
  export default BadgeWebComponent;
}

declare namespace JSX {
    interface IntrinsicElements {
        'badge-web-component': any;
    }
}
