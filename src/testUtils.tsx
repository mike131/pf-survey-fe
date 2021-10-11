import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

const Providers: FC = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
