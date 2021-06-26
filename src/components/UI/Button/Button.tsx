import React from 'react';
import MaterialUIButton from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ButtonProps {
	children: React.ReactNode;
	outlined?: boolean;
	disabled?: boolean;
	onClick?: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			borderRadius: '3rem',
			boxShadow: 'none',
			textTransform: 'none',
			fontWeight: 'bold',
			padding: '1rem 2.5rem',
			border: '1px solid',
			lineHeight: 1.5,
		},

		contained: {
			backgroundColor: theme.palette.primary.dark,
			'&:hover': {
				backgroundColor: theme.palette.primary.main,
			},
		},
	})
);

function Button(props: ButtonProps) {
	const classes = useStyles(props);

	return (
		<MaterialUIButton
			className={
				props.outlined ? classes.root : classes.root + ' ' + classes.contained
			}
			variant={props.outlined ? 'outlined' : 'contained'}
			color="primary"
			disableElevation
			disabled={props.disabled}
			onClick={() => props.onClick()}
		>
			{props.children}
		</MaterialUIButton>
	);
}

export default Button;
