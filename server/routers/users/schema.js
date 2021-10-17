module.exports = {
    username: {
        in: 'body',
        isLength: {
            options: { min: 3 },
            errorMessage: 'username min 3 charaters',
        }
    },
    password: {
        in: 'body',
        isLength: {
            options: { min: 8 },
            errorMessage: 'password min 8 charaters',
        }
    }
}