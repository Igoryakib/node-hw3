const yup = require('yup');

exports.verifyDataCreate = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    favorite: yup.boolean().default(false),
});