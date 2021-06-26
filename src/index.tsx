import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#555',
			main: '#333',
			dark: '#000',
		},
	},
	typography: {
		fontFamily: ['Profilfont', 'serif'].join(','),
		htmlFontSize: 10,
		button: {
			fontSize: 18,
		},
	},
});

theme.typography.h1 = {
	fontSize: 46,
	lineHeight: '1.2em',
	marginBottom: '4rem',
	fontWeight: 400,
	[theme.breakpoints.up('md')]: {
		fontSize: 64,
	},
};

theme.typography.body1 = {
	fontSize: 20,
	[theme.breakpoints.up('md')]: {
		fontSize: 28,
	},
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
