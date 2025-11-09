import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import VueApp from '../App.vue';

const AppWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !appRef.current) {
      // Create and mount Vue app
      appRef.current = createApp(VueApp);
      appRef.current.mount(containerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default AppWrapper;
