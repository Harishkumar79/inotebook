const { check } = require('express-validator');

// Validate email
const validateEmail = check('email')
    .exists()
    .isEmail()
    .normalizeEmail()

// Other validations for username, password, etc.
// ...

module.exports = {
    validateEmail,
    // Other validation functions
};
