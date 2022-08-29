module.exports = {
  tags: ['EUD'],
  'Users Page Test Case'(browser) {
    const url = 'http://localhost:3000/users';
    const emailTest = 'input[name="email-nw"]';
    const pwTest = 'input[name="password-nw"]';
    browser
      .url(url)
      .waitForElementVisible('.loginContainer')
      .setValue(emailTest, 'yeoxhshelby20.21@ichat.sp.edu.sg')
      .setValue(pwTest, 'password')
      .click('.signInBtn')
      .waitForElementVisible('.EUS')
      .url(url);

    // checks if page loads correctly
    browser.waitForElementVisible('.App');
    browser.expect.element('.user-tb').to.be.visible;
    browser.assert.textContains('.tb-head-nw', 'User ID');
    browser.assert.textContains(
      {
        selector: '.row-id',
        index: 0,
      },
      '37',
      'Louis Pang',
      '87870866',
      'guanxi.20@ichat.sp.edu.sg'
    );

    // test to add user
    browser
      .click('.btn-link')
      .setValue('.firstname-nw', 'Hello')
      .setValue('.lastname-nw', 'Bye')
      .setValue('.email-nw', 'bye@email.com')
      .setValue('.contact-nw', '90001111')
      .setValue('.password-nw', 'password')
      .click('.btn-danger')
      .acceptAlert()
      .pause(1000);

    browser.refresh;
    browser.click('#Hello');
    browser.acceptAlert();
    browser.assert.textContains(
      {
        selector: '.row-id',
        index: 5,
      },
      '60',
      'Night Watch',
      '87889988',
      'email@email.com'
    );
  },
};
