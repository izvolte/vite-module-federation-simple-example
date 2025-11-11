import React from 'react';

import 'remote3/BadgeWebComponent'

const BadgeWebComponents: React.FC = () => {
  return (
    <div className="button-group">
        <badge-web-component count="10" label="Web Components" color="blue"/>
    </div>
  );
};

export default BadgeWebComponents;
