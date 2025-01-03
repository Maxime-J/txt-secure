import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
        },
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          width: '100%',
        },
        inputAdornedEnd: {
          minHeight: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e0e0e0',
          padding: 10,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disableScrollLock: true,
        },
      },
      styleOverrides: {
        select: {
          padding: 10,
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: ({ theme }) => ({
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
              opacity: 1,
              border: 0,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: theme.palette.primary.main,
            border: '6px solid #fff',
          },
        }),
        thumb: {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        track: ({ theme }) => ({
          borderRadius: 26 / 2,
          backgroundColor: '#e9e9ea',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: 'white',
          fontSize: 'inherit',
          color: 'black',
          boxShadow: theme.shadows[1],
        }),
      },
    },
  },
});

export default muiTheme;
