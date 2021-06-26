interface CheckValidityRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
  isAlphabetical?: boolean;
  isAlphanumeric?: boolean;
}

export const checkValidity = (value: string, rules: CheckValidityRules | undefined) => {
	let isValid = true;

	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}

  if (rules.isAlphabetical) {
    const pattern = /^[a-zA-Z]+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isAlphanumeric) {
    const pattern = /^[a-zA-Z0-9\s]+$/;
    isValid = pattern.test(value) && isValid;
  }

	return isValid;
};

export const checkAllConditions = (...conditions: boolean[]) => {
  return conditions.every(condition => condition);
}