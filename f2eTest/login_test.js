Feature('login');

const {getPageObject, getPageElement} = require('./pageObject')

Scenario('should see home page', ({ I }) => {
    I.amOnPage('/');
    I.see(getPageObject('homePageDescription'));

    // 1. go to login page before signup page
    I.click(getPageElement('menuProtectedTab'))
    I.saveScreenshot("login-form.png");

    I.click(getPageElement('signupLinkOnLoginPage'))
    I.saveScreenshot("login-signup.png");

    // 2. signup
    const username = `${new Date().getTime()}-username`
    const password = `${new Date().getTime()}-password`
    I.fillField('username', username);
    I.fillField('password', password);
    I.saveScreenshot("login-signup-fillfields.png");
    I.click(getPageElement('signupSubmitButton'))
    I.saveScreenshot("login-signup-submit.png");

    // 3. login again
    I.click(getPageElement('menuProtectedTab'))
    I.fillField('username', username);
    I.fillField('password', password);
    I.click(getPageElement('loginSubmitButton'))
    I.see(getPageObject('homePageDescription')); //login success go back to home page

    // 4. able to visit rotected page
    I.click(getPageElement('menuProtectedTab'))
    I.see('imageUrl'); 
    I.see('updatedAt'); 
});
