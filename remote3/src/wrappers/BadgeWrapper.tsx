import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import VueBadge from '../components/Badge.vue';

interface BadgeProps {
  count: number;
  label: string;
  color?: 'blue' | 'green' | 'red' | 'orange';
}

const BadgeWrapper: React.FC<BadgeProps> = ({ count, label, color = 'blue' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Unmount previous instance if it exists
      if (appRef.current) {
        appRef.current.unmount();
      }

      // Create and mount Vue component with props
      appRef.current = createApp(VueBadge, {
        count,
        label,
        color,
      });
      appRef.current.mount(containerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, [count, label, color]); // Re-mount when props change

  return <div ref={containerRef}></div>;
};

export default BadgeWrapper;
