import React from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { checkValidity, checkAllConditions } from '../../shared/utility';

interface InputState {
	value: string;
	valid: boolean;
	touched: boolean;
	rules?: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		isEmail?: boolean;
		isNumeric?: boolean;
		isAlphabetical?: boolean;
		isAlphanumeric?: boolean;
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				'& div + div': {
					marginLeft: '3.8rem',
				},
			},
		},
		paragraph: {
			marginBottom: '6.8rem',
		},

		lastButton: {
			marginLeft: '2.2rem',
		},
		outputText: {
			marginTop: '4rem',
		},
	})
);

const optionsBonus = [
	{ value: '0', label: '0 prosent' },
	{ value: '10', label: '10 prosent' },
	{ value: '20', label: '20 prosent' },
	{ value: '30', label: '30 prosent' },
	{ value: '40', label: '40 prosent' },
	{ value: '50', label: '50 prosent' },
	{ value: '60', label: '60 prosent' },
	{ value: '70', label: '70 prosent' },
];

function FormBilforsikring() {
	const classes = useStyles();
	const [registreringsnummer, setRegistreringsnummer] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			minLength: 5,
			maxLength: 20,
			required: true,
			isAlphanumeric: true,
		},
	});
	const [bonus, setBonus] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			required: true,
		},
	});
	const [fødselsnummer, setFødselsnummer] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			minLength: 11,
			maxLength: 11,
			isNumeric: true,
		},
	});
	const [fornavn, setFornavn] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			required: true,
			minLength: 2,
			maxLength: 20,
			isAlphabetical: true,
		},
	});
	const [etternavn, setEtternavn] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			required: true,
			minLength: 2,
			maxLength: 20,
			isAlphabetical: true,
		},
	});
	const [epost, setEpost] = useState({
		value: '',
		valid: false,
		touched: false,
		rules: {
			required: true,
			maxLength: 20,
			isEmail: true,
		},
	});

	const [formIsValid, setFormIsValid] = useState(false);
	const [pris, setPris] = useState<null | string>(null);

	const handleInputChange = (
		value: string,
		state: InputState,
		setState: React.Dispatch<React.SetStateAction<any>>
	) => {
		setState({
			...state,
			value,
			valid: checkValidity(value, state.rules),
			touched: true,
		});
	};

	const handleSubmit = () => {
		setPris('15 000');
	};

	useEffect(() => {
		const fomrmIsValid = checkAllConditions(
			registreringsnummer.valid,
			bonus.valid,
			fødselsnummer.valid,
			fornavn.valid,
			etternavn.valid,
			epost.valid
		);
		if (fomrmIsValid) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	}, [registreringsnummer, bonus, fødselsnummer, fornavn, etternavn, epost]);

	return (
		<form>
			<Typography variant="h1">Kjøp Bilforsikring</Typography>
			<Typography variant="body1">
				Det er fire forskjellige forsikringer å velge mellom.
			</Typography>
			<Typography className={classes.paragraph} variant="body1">
				Ansvarsforsikring er lovpålagt om kjøretøyet er registrert og skal
				brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor
				gammel bilen din er og hvordan du bruker den.
			</Typography>
			<Input
				name="registreringsnummer"
				value={registreringsnummer.value}
				valid={registreringsnummer.valid}
				touched={registreringsnummer.touched}
				onChange={(value: string) =>
					handleInputChange(value, registreringsnummer, setRegistreringsnummer)
				}
				type="text"
				label="Bilens registreringsnummer"
				placeholder="E.g. AB 12345"
				errorText="Skriv et gyldig registreringsnummer"
			/>
			<Input
				name="bonus"
				value={bonus.value}
				valid={bonus.valid}
				touched={bonus.touched}
				onChange={(value: string) => handleInputChange(value, bonus, setBonus)}
				type="select"
				label="Din bonus"
				options={optionsBonus}
				placeholder="Velg bonus"
				helperText="Velg bonus fra alternativene"
			/>
			<Input
				name="fødselsnummer"
				value={fødselsnummer.value}
				valid={fødselsnummer.valid}
				touched={fødselsnummer.touched}
				onChange={(value: string) =>
					handleInputChange(value, fødselsnummer, setFødselsnummer)
				}
				type="text"
				label="Fødselsnummer"
				placeholder="11 siffer"
				errorText="Skriv et gyldig fødselsnummer"
			/>
			<div className={classes.container}>
				<Input
					name="fornavn"
					value={fornavn.value}
					valid={fornavn.valid}
					touched={fornavn.touched}
					onChange={(value: string) =>
						handleInputChange(value, fornavn, setFornavn)
					}
					type="text"
					label="Fornavn"
					placeholder=""
					errorText="Skriv et gyldig fornavn"
				/>
				<Input
					name="etternavn"
					value={etternavn.value}
					valid={etternavn.valid}
					touched={etternavn.touched}
					onChange={(value: string) =>
						handleInputChange(value, etternavn, setEtternavn)
					}
					type="text"
					label="Etternavn"
					placeholder=""
					errorText="Skriv et gyldig etternavn"
				/>
			</div>
			<Input
				name="epost"
				value={epost.value}
				valid={epost.valid}
				touched={epost.touched}
				onChange={(value: string) => handleInputChange(value, epost, setEpost)}
				type="email"
				label="E-post"
				placeholder=""
				errorText="Skriv en gyldig e-postadresse"
			/>

			<Button disabled={!formIsValid} onClick={handleSubmit}>
				Beregn pris
			</Button>
			<span className={classes.lastButton}>
				<Button outlined>Avbryt</Button>
			</span>

			<div className={classes.outputText}>
				{pris ? (
					<Typography>Din pris er beregnet til {pris} kr.</Typography>
				) : null}
			</div>
		</form>
	);
}

export default FormBilforsikring;
