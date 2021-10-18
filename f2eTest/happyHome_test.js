Feature('home page');

const {getPageObject} = require('./pageObject')

Scenario('should see home page', ({ I }) => {
    I.amOnPage('/');
    I.see(getPageObject('homePageDescription'));
});
