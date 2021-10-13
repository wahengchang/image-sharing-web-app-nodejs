const config = {
    'auth_not_invalid' : 'The username or password of is not valid',
    'unknown' : 'the error is unknow.',
}

const getErrorObject = (key = '') => {
    return config[key] || config['unknown']
}

module.exports = {getErrorObject}