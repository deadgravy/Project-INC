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
      .click("//*[@id='Today's Production']")
      .waitForElementVisible('.App')
      .waitForElementVisible('.react-datepicker-wrapper')
      .click('.react-datepicker__input-container')
      .click('.react-datepicker__year-dropdown-container')
      .click('.react-datepicker__year-option') // click 2021
      .click('.react-datepicker__day--010');

    //   .click('.singleProduct')
    //   .waitForElementVisible('.modal-content')
    //   .click('button#Vegetable Cutter')

    //   .click('multipleProduct')
    //   .waitForElementVisible('.modal-content')
    //   .click('button#Big Steamer Box')
    //   .waitForElementVisible('.table');
  },
};
