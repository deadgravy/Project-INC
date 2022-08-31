module.exports = {
  'Login Test Case'(browser) {
    const url = 'http://localhost:3000';
    const emailTest = 'input[name="email-nw"]';
    const pwTest = 'input[name="password-nw"]';
    browser
      .url(url)
      .waitForElementVisible('.loginContainer')
      .assert.textContains('.loginContainer', 'Welcome Back to FIRC!')
      .setValue(emailTest, 'test@test.com')
      .setValue(pwTest, 'password')
      .click('.signInBtn')
      .assert.urlContains('equipmentUtilisationSnapshot', 'Successful login!')
      .waitForElementVisible('.EUS');
  },
};
