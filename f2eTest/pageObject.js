const pageObject = {
    'homePageDescription' : 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
}
const pageElement = {
    'menuProtectedTab' : '.nav li:nth-child(2)',
    'signupLinkOnLoginPage' : '#sigupButton',
    'signupSubmitButton' : '#signupSubmit',
    'loginSubmitButton' : '#loginSubmit',
}
const getPageObject = (key = '') => {
    return pageObject[key] || ''
}
const getPageElement = (key = '') => {
    return pageElement[key] || ''
}

module.exports = {getPageObject, getPageElement}