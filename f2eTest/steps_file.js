// in this file you can append custom step methods to 'I' object
const {getPageObject, getPageElement} = require('./pageObject')

module.exports = function() {
  return actor({
    signupAndLogin: function(){
      this.amOnPage('/');
      this.see(getPageObject('homePageDescription'));
  
      // 1. go to login page before signup page
      this.click(getPageElement('menuProtectedTab'))
  
      this.click(getPageElement('signupLinkOnLoginPage'))
  
      // 2. signup
      const username = `${new Date().getTime()}-username`
      const password = `${new Date().getTime()}-password`
      this.fillField('username', username);
      this.fillField('password', password);
      this.click(getPageElement('signupSubmitButton'))
  
      // 3. login again
      this.click(getPageElement('menuProtectedTab'))
      this.fillField('username', username);
      this.fillField('password', password);
      this.click(getPageElement('loginSubmitButton'))
      this.see(getPageObject('homePageDescription')); //login success go back to home page
  
    }

  });
}
