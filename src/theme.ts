import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: { bg: '#FFFDF6', color: '#1A1A1A' },
      '*:focus': {
        boxShadow: 'none !important', // remove Chakra's focus ring
        outline: 'none !important',   // remove browser's outline
      },
    },
  },
  colors: {
    brand: {
      50: '#E8F0EE',
      100: '#C5D8D2',
      200: '#A1C0B6',
      300: '#7DA89A',
      400: '#5A907E',
      500: '#2D4A42', // primary deep green
      600: '#263C36',
      700: '#1F2E2A',
      800: '#18201E',
      900: '#111312',
    },
    cream: '#FFFDF6',
    secondary: '#F0F3EE',
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 'medium', borderRadius: 'md' },
      variants: {
        solid: { bg: 'brand.500', color: 'white', _hover: { bg: 'brand.400' } },
        outline: { borderColor: 'brand.500', color: 'brand.500', _hover: { bg: 'brand.50' } },
        secondary: { bg: 'secondary', color: 'black', _hover: { bg: '#E4E7E1' } },
      },
    },
    Tag: {
      parts: ['container', 'label', 'closeButton'],
      variants: {
        metric: {
          container: {
            bg: 'secondary', // soft cream-gray
            color: 'black',
            borderRadius: 'md',
            borderWidth: '1px',
            borderColor: 'brand.50',
          },
        },
        brandSubtle: {
          container: {
            bg: 'brand.50',
            color: 'brand.600',
            borderRadius: 'md',
          },
        },
      },
      defaultProps: {
        variant: 'metric',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'transparent',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'transparent',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'transparent',
      },
    },
    NumberInput: {
      defaultProps: {
        focusBorderColor: 'transparent',
      },
    },
  },
})

export default theme