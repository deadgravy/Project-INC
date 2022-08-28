module.exports = {
  'TPD Test Case'(browser) {
    const url = 'http://localhost:3000/todaysProduction';
    const emailTest = 'input[name="email-nw"]';
    const pwTest = 'input[name="password-nw"]';
    browser
      .url(url)
      .waitForElementVisible('.loginContainer')
      .setValue(emailTest, 'test@test.com')
      .setValue(pwTest, 'password')
      .click('.signInBtn')
      .waitForElementVisible('.EUS')
      .click({
        selector: '.row.level.px-1',
        index: 2,
      })
      .expect.element('.todaysProd').to.be.visible;

    // test for one date
    browser
      .click('.react-datepicker-wrapper')
      .waitForElementVisible('.react-datepicker-popper')
      .click('.react-datepicker-ignore-onclickoutside')
      .click('.react-datepicker__input-container')
      .click(
        '.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--scroll'
      )
      .click('.react-datepicker__year-option')
      .click('.react-datepicker__day.react-datepicker__day--010');

    // test for single product modal
    browser.click('.single-btn');
    browser.expect.element('.modal-content').to.be.visible;
    browser.click({
      selector: '.single-prod-btn',
      index: 2,
    });

    // test for multiple product modal
    browser.click('.multi-btn');
    browser.expect.element('.modal-content').to.be.visible;
    browser.click({
      selector: '.multi-prod-btn',
      index: 2,
    });

    browser.expect.element('.chartSection').to.be.visible;

    browser.click('.all-products'); //
    browser.expect.element('.modal-content').to.be.visible;

    browser.click({
      selector: '.modal-btn',
      index: 2,
    });

    browser.waitForElementVisible('.graph');
  },
};
