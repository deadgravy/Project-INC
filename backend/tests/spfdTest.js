module.exports = {
  'SPFD Test Case'(browser) {
    const url = 'http://localhost:3000/equipmentUtilisationDashboard';
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
        index: 3,
      })

      // checks if page loads correctly
      .waitForElementVisible('.singleProductFlow')
      .assert.textContains('.Row1', 'Single Product Flow Dashboard')
      .assert.textContains(
        '.spfdHeader',
        'Please Select Date and Recipe Above!'
      );

    // test for one date
    browser
      .click('.select-btn')
      .waitForElementVisible('.spfd-modal')
      .waitForElementVisible('.react-datepicker-wrapper')
      //.click('.react-datepicker-ignore-onclickoutside')
      .click('.react-datepicker__input-container');

    // click previous icon till it reaches aug 2021
    browser
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation')
      .click('.react-datepicker__navigation');

    // choose date range and recipe
    browser
      .click('.react-datepicker__day--009')
      .click('.spfd-modal')
      .pause(500)
      .click('.react-datepicker__day--013')
      .assert.valueEquals("input[type='text']", '2021/08/09 - 2021/08/13')
      .waitForElementVisible('.spfd-modal')
      .expect.element('#portal').to.be.visible;
    browser.expect.element('.radio-btns').to.be.visible;

    browser
      .click('input[id="Sub G"]') //
      .click('.continue-btn');

    // checks if elements loaded
    browser.waitForElementVisible('#reactgooglegraph-1');

    // testing for equipment production analysis
    browser
      .click('.Dropdown-root')
      .waitForElementVisible('.Dropdown-menu')
      .click({
        selector: '.Dropdown-option',
        index: 1,
      })
      .assert.textContains('.Dropdown-placeholder', 'Meat Mincer')
      .expect.element('#reactgooglegraph-2').to.be.visible;
  },
};
