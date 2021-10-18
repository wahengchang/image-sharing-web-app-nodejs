Feature('upload image page');

const {getPageElement} = require('./pageObject')

Scenario('should able to upload image', ({ I }) => {
    const username = `${new Date().getTime()}-username`
    const password = `${new Date().getTime()}-password`
    const title = `${new Date().getTime()}-title`
    const description = `${new Date().getTime()}-description`
    I.signupAndLogin(I,username, password)

    I.amOnPage('/');
    I.click(getPageElement('menuProtectedTab'))
    I.see(`'s Images`)

    I.click('.buttonTag')
    I.seeInCurrentUrl('/images/create')
    I.fillField('title', title);
    I.fillField('description', description);

    I.attachFile('input[type=file]', './f2eTest/testImage.png');
    I.click('button[type=submit]')
    I.see('upload Success')

    I.click(getPageElement('menuProtectedTab'))
    I.seeVisualDiff('./f2eTest/testImage.png', {tolerance: 2, prepareBaseImage: false});

    I.saveScreenshot("upload-image.png");
});
