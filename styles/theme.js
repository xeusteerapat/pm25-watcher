// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// const breakPoint = createBreakpoints({
//   sm: '30em',
//   md: '48em',
//   lg: '62em',
//   lg: '80em',
// });

const overrides = {
  ...chakraTheme,
  breakPoint: ['30em', '48em', '62em', '80em'],
};

export const theme = extendTheme(overrides);
