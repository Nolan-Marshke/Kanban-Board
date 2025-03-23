declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  export const jsx: React.JSXElementConstructor<React.ReactNode>;
  export const jsxs: React.JSXElementConstructor<React.ReactNode>;
  export const Fragment: React.ComponentType<{children?: React.ReactNode}>;
}

declare module 'react-dom' {
  export = ReactDOM;
  export as namespace ReactDOM;
}