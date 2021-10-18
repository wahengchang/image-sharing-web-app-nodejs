Feature('my profile page');

const {getPageElement} = require('./pageObject')

Scenario('should able to see my profile', ({ I }) => {
    const username = `${new Date().getTime()}-username`
    const password = `${new Date().getTime()}-password`
    const title = `${new Date().getTime()}-title`
    const description = `${new Date().getTime()}-description`
    I.signupAndLogin(I,username, password)

    I.amOnPage('/');
    I.click(getPageElement('menuMeTab'))
    I.see(`Hi ${username}`)
    I.saveScreenshot("myprofile-image.png");
});
