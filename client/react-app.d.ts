/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react/jsx-runtime' {
    export default JSX.Element;
    export const jsx: (type: React.ElementType, props: Record<string, unknown>) => JSX.Element;
    export const jsxs: (type: React.ElementType, props: Record<string, unknown>) => JSX.Element;
    export const Fragment: React.FC;
  }
  
  declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }