import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
    },
    palette: {
        primary: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff",
        },
        secondary: {
            main: '#ffffff',
        },
        info: {
            light: "#ffffff",
            main: "#ffffff",
            dark: "#ffffff",
        },
        text: {
            secondary: "#ffffff"
        },
        palette: {
            common: {
                black: "#ffffff",
                white: "#ffffff"
            }
        }
    },
});

export default theme