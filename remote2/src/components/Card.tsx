import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  footer,
}) => {
  return (
    <div className="shared-card">
      {icon && <div className="shared-card__icon">{icon}</div>}
      <div className="shared-card__content">
        <h3 className="shared-card__title">{title}</h3>
        <p className="shared-card__description">{description}</p>
      </div>
      {footer && <div className="shared-card__footer">{footer}</div>}
    </div>
  );
};

export default Card;
