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
      '36',
      'Javier Fok',
      '96434639',
      'javierfokjf11.21@ichat.sp.edu.sg'
    );

    // test to add user
    browser
      .click('.btn-link')
      .setValue('.firstname-nw', 'Night')
      .setValue('.lastname-nw', 'Watch')
      .setValue('.email-nw', 'nightwatch@email.com')
      .setValue('.contact-nw', '90001111')
      .setValue('.password-nw', 'password')
      .click('.btn-danger')
      .pause(1000)
      .acceptAlert();

    browser.refresh;

    browser.pause(1000);
    browser.click('#Night');
    browser.pause(500);
    browser.acceptAlert();
    browser.pause(500);
    browser.acceptAlert();
    browser.assert.textContains(
      {
        selector: '.row-id',
        index: 6,
      },
      '42',
      'first last',
      '80082900',
      'email@email.com'
    );
  },
};
