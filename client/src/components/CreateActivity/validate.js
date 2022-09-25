export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!/(\s*\w+\s*)+/g.test(input.name)) {
        errors.name = 'Name is invalid';
    }

    if (!input.difficulty) {
        errors.difficulty = 'Difficulty is required';
    } else if (!/^[1-5]{1}$/.test(input.difficulty)) {
        errors.difficulty = 'Difficulty is invalid';
    }
    if (!input.duration) {
        errors.duration = 'Duration is required';
    } else if (!/^([0-9]{1})$|^([1-9]{1}[0-9]{1})$|^([1]{1}[0]{1}[0-9]{1})$|^([1]{1}[1]{1}[0-9]{1})$|^([1]{1}[2]{1}[0]{1})$/.test(input.duration)) {
        errors.duration = 'Duration is invalid';
    }
    
    if (!input.country || !input.countries_id.length) {
        errors.country = 'Country is required';
    }

    return errors;
};