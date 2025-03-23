// Global type declarations to satisfy TypeScript
declare module 'react';
declare module 'react-dom';
declare module 'react-dom/client';
declare module 'react/jsx-runtime';
declare module 'react-router-dom';
declare module 'jwt-decode';

// Any other modules your app uses

// Add JSX namespace to support JSX syntax
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}