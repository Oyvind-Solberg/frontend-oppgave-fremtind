import React from 'react';
import {
	fade,
	withStyles,
	makeStyles,
	createStyles,
	useTheme,
	Theme,
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface InputProps {
	value: string;
	options?: { value: string; label: string }[];
	name: string;
	type: string;
	label: string;
	placeholder: string;
	helperText?: string;
	errorText?: string;
	onChange: Function;
	valid: boolean;
	touched: boolean;
}

const TextFieldInput = withStyles((theme) => ({
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.common.white,
		border: `1px solid ${theme.palette.primary.dark}`,
		fontSize: '2rem',
		padding: '1.2rem 1.1rem 1rem 1.1rem',

		transition: theme.transitions.create(['border-color', 'box-shadow']),
		[theme.breakpoints.up('md')]: {
			width: '29rem',
		},
		'&:focus': {
			boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
			borderColor: theme.palette.primary.main,
		},
	},
}))(OutlinedInput);

const StyledInputLabel = withStyles((theme) => ({
	root: {
		fontSize: '3.725rem',
		fontWeight: 500,
		lineHeight: '1.5em',
		color: theme.palette.text.primary,
		width: '100%',
		marginBottom: '1rem',
	},
}))(InputLabel);

const StyledSelect = withStyles((theme) => ({
	root: {
		padding: '0.8rem 0 0.6rem 1.1rem',
	},
	icon: {
		marginRight: '1.5rem',
	},
}))(Select);

const StyledMenuItem = withStyles((theme) => ({
	root: {
		fontSize: '2rem',
		padding: '1.2rem 1.1rem 1rem 1.1rem',
	},
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginBottom: '4rem',
		},
		helperText: {
			marginTop: '1rem',
			fontSize: '1.6rem',
			color: theme.palette.text.primary,
		},
	})
);

function Input(props: InputProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles(props);

	const error = props.touched ? !props.valid : false;
	const helperText = props.helperText ? props.helperText : '';

	let input;
	switch (props.type) {
		case 'email':
			input = (
				<TextFieldInput
					placeholder={props.placeholder}
					id={props.name}
					type={props.type}
					value={props.value}
					onChange={(event) => props.onChange(event.target.value)}
				/>
			);
			break;

		case 'text':
			input = (
				<TextFieldInput
					placeholder={props.placeholder}
					id={props.name}
					value={props.value}
					onChange={(event) => props.onChange(event.target.value)}
				/>
			);
			break;

		case 'select':
			input = (
				<StyledSelect
					labelId={props.name}
					id={props.name + '-select'}
					value={props.value}
					onChange={(event: React.ChangeEvent<{ value: any }>) =>
						props.onChange(event.target.value)
					}
					input={<TextFieldInput />}
					displayEmpty={true}
					renderValue={() => (props.touched ? props.value : props.placeholder)}
					IconComponent={ArrowDownwardIcon}
				>
					{props.options
						? props.options.map((option) => (
								<StyledMenuItem key={option.value} value={option.value}>
									{option.label}
								</StyledMenuItem>
						  ))
						: null}
				</StyledSelect>
			);

			break;

		default:
			input = (
				<TextFieldInput
					placeholder={props.placeholder}
					id={props.name}
					value={props.value}
					onChange={(event) => props.onChange(event.target.value)}
				/>
			);
			break;
	}
	return (
		<div className={classes.container}>
			<StyledInputLabel error={false} shrink htmlFor={props.name}>
				{props.label}
			</StyledInputLabel>
			<FormControl error={error} fullWidth={isMobile}>
				{input}
				<FormHelperText
					className={classes.helperText}
					id={props.name + '-helper-text'}
				>
					{error ? props.errorText : helperText}
				</FormHelperText>
			</FormControl>
		</div>
	);
}

export default Input;
