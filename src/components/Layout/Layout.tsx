import React from 'react';
import FormBilforsikring from '../FormBilforsikring/FormBilforsikring';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			margin: 'auto',
			maxWidth: '100%',
			padding: '3.4rem 1rem',
			backgroundColor: 'white',
			[theme.breakpoints.up('md')]: {
				maxWidth: '1080px',
				padding: '10rem',
			},
		},
	})
);

function Layout() {
	const classes = useStyles();
	return (
		<main className={classes.container}>
			<FormBilforsikring />
		</main>
	);
}

export default Layout;
