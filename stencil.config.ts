import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'xxilk-widget',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    transform: {
      "^.+\\.svg$": "<rootDir>/src/utils/svgTransform.ts"
   },
  },
  plugins: [inlineSvg()],
};
