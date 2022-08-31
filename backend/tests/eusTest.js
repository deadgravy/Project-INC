module.exports = {
  'EUS Test Case'(browser) {
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
      .waitForElementVisible('.machineConnectivity')
      .waitForElementVisible('.equipmentDetails')
      .click("a[href='#basic-modal']")
      .expect.element('#basic-modal').to.be.visible
      
    // Testing for one date of daily toggle (Start Count)
    browser  
      .click('.bg-green-500.text-white')
      .click('#toggle-button1')
      .click('.react-datepicker-wrapper')
      .waitForElementVisible('.react-datepicker-popper')
      .click('.react-datepicker-ignore-onclickoutside')
      .click('.react-datepicker__input-container')
      .click('.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--scroll')
      .click('.react-datepicker__year-option')
      .click('.react-datepicker__day.react-datepicker__day--010')
      .click('.u-pull-right.bg-info.text-white')
      .assert.textContains('#timeFrame', '2021-08-10 to 2021-08-10')
      .waitForElementVisible('#defaultChart')
    
    // Testing for comparing charts (daily toggle)
    browser
      .click("a[href='#basic-modal']")
      .expect.element('#basic-modal').to.be.visible
    
    browser
      .click('.bg-primary.text-white')
      .pause(500)
      .expect.element('.compare').to.be.visible

    browser
      .click({
        selector: '.react-datepicker__input-container',
        index: 1
      })
      .waitForElementVisible('.react-datepicker__month-container')
      .click('.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--scroll')
      .click('.react-datepicker__year-option')
      .click('.react-datepicker__day.react-datepicker__day--010')
      .click({
        selector: '.react-datepicker__input-container',
        index: 2
      })
      .waitForElementVisible('.react-datepicker__month-container')
      .click('.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--scroll')
      .click('.react-datepicker__year-option')
      .click('.react-datepicker__day.react-datepicker__day--017')
      .click('.modal-footer .u-pull-right.bg-info.text-white')
      .assert.textContains('#timeFrame', '2021-08-10 to 2021-08-10')
      .waitForElementVisible('#defaultChart')
      .assert.textContains('#compareDate', '2021-08-17 to 2021-08-17')
      .waitForElementVisible('#comparisonChart')
  },
};