const {getReasonPhrase, StatusCodes} = require('http-status-codes')
const { validationResult } = require('express-validator');

const sleep = (s=1) => new Promise((resolve) => {
    console.log('[INFO] going to sleep')
    setTimeout(() => {
        console.log('[INFO] end sleep')
        return resolve()
    }, 1000 * s);
})

const responseDefaultError = (res) => (STATUS_CODE, customMessage = null) => {
    const msg = customMessage || getReasonPhrase(STATUS_CODE)
    res.status(STATUS_CODE)
    return res.json({
        errorMessage: msg
      });
}

const validationResultAndResponse = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    return next()
}

module.exports = (req, res, next) => {
    req.sleep = sleep
    res.responseDefaultError = responseDefaultError(res)
    return next()
}

module.exports.validationResultAndResponse = validationResultAndResponse