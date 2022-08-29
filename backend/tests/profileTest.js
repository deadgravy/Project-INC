module.exports = {
  'Profile Test Case'(browser) {
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
      .waitForElementVisible('.EUS')
      .click({
        selector: '.row.level.px-1',
        index: 7
      })
      .waitForElementVisible('.po-display')

    // Checking whether the fields match the one from the local storage
    browser
    .waitForElementVisible('.profileContainer')
    .assert.valueEquals({
      selector: "input[type='name']",
      index: 0
    }, 'test_first')
    .assert.valueEquals({
      selector: "input[type='name']",
      index: 1
    }, 'test_second')
  },
};