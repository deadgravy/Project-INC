module.exports = {
  tags: ['EUD'],
  'EUD Test Case'(browser) {
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
        index: 1,
      })

      // checks if page loads correctly
      .waitForElementVisible('.equipmentUtilisationDashboard')
      .assert.textContains('.Row1', 'Equipment Utilisation Dashboard')
      .assert.textContains('.Row3', 'Single Recipe Equipment')
      .assert.textContains('.Row5', 'Multiple Recipe Equipment')
      .assert.textContains('.Row7', 'Equipment Usage Details');

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

    // checks if elements loaded
    browser
      .waitForElementVisible('.colourLegend')
      .expect.element('#reactgooglegraph-1').to.be.visible;
    browser.expect.element('#reactgooglegraph-2').to.be.visible;

    // test for equipment usage details
    browser
      .setValue('#input-nw', '2')
      .waitForElementVisible('.singleContent')
      .waitForElementVisible('.multipleContent');

    // test for weekly view
    browser
      .click('#toggle-button2')
      .assert.urlContains('weekly', 'Changed to weekly view');

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

    // checks if elements loaded
    browser.waitForElementVisible('.colourLegend');
    browser.expect.element('.singleContent').to.be.visible;
    browser.expect.element('.multipleContent').to.be.visible;
  },
};
