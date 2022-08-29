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
      .url('http://localhost:3000/profile');

    // Checking whether the fields match the one from the local storage
    browser
      .waitForElementVisible('.profileContainer')
      .assert.valueEquals(
        {
          selector: "input[type='name']",
          index: 0,
        },
        'test'
      )
      .assert.valueEquals(
        {
          selector: "input[type='name']",
          index: 1,
        },
        'test'
      )
      .assert.valueEquals(
        {
          selector: "input[type='email']",
        },
        'test@test.com'
      )
      .assert.valueEquals(
        {
          selector: "input[type='tel']",
        },
        '91234568'
      );

    // Testing update function
    browser
      .setValue(
        {
          selector: "input[type='name']",
          index: 0,
        },
        'test1'
      )
      .setValue(
        {
          selector: "input[type='name']",
          index: 1,
        },
        'test1'
      )
      .click('.update-btn')
      .pause(500)
      .acceptAlert();

    // checking if update was implemented
    browser.assert
      .valueEquals(
        {
          selector: "input[type='name']",
          index: 0,
        },
        'test1'
      )
      .assert.valueEquals(
        {
          selector: "input[type='name']",
          index: 1,
        },
        'test1'
      )
      .assert.valueEquals(
        {
          selector: "input[type='email']",
        },
        'test@test.com'
      )
      .assert.valueEquals(
        {
          selector: "input[type='tel']",
        },
        '91234568'
      );

    // revert update
    browser
      .setValue(
        {
          selector: "input[type='name']",
          index: 0,
        },
        'test'
      )
      .setValue(
        {
          selector: "input[type='name']",
          index: 1,
        },
        'test'
      )
      .click('.update-btn')
      .pause(500)
      .acceptAlert();
  },
};
