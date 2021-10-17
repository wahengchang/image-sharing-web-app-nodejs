const config = {
    'auth_not_valid' : 'The username or password of is not valid',
    'unknown' : 'the error is unknow.',
    'image_not_valid' : 'The imageUrl or title of is not valid.',
    'file_not_exist' : 'The file is not exited.',
    'forbidden' : 'The data you try to access is forbidden.',
}

const getErrorObject = (key = '') => {
    return config[key] || config['unknown']
}

module.exports = {getErrorObject}