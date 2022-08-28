module.exports = {
  'POD Test Case'(browser) {
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
        index: 4
      })
      .waitForElementVisible('.po-display')

    // Checking whether the input box works
    browser
      .setValue('#message', 'Base A')
      .click('#submit')
      .pause(1000)
      .assert.textContains({
        selector: '.bar-header text tspan',
        index: 0
      }, 'Base A')

    // Checking whether the modal works
    browser
      .click('.modalComponent')
      .waitForElementVisible('.modal-content')
      .click('label[for="Base A"]')
      .assert.urlContains('53', 'Base A has been searched')
      .assert.textContains({
        selector: '.bar-header text tspan',
        index: 0
      }, 'Base A')

    // Checking if datepicker works
    browser
      .click('.react-datepicker__input-container')
      .click('.react-datepicker__day.react-datepicker__day--010.react-datepicker__day--keyboard-selected.react-datepicker__day--range-start.react-datepicker__day--in-range')
      .click('.react-datepicker__day.react-datepicker__day--018')
      .assert.valueEquals("input[type='text']", '2021-08-10 - 2021-08-18')

    // Check what type of graph is it
    browser
      .assert.textContains('.MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input', 'Line Chart')
      .isVisible('#lineChart')
      .click('.MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input')
      .click("li[data-value='BarChart']")
      .assert.textContains('.MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input', 'Bar Chart')
      .isVisible('#barChart')
  },
};