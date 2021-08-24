/**
 * Validation functions for the contact form.
 *
 * Created by: Sweta Kumari, 09/01/2019
 */

/*jslint browser: true, devel: true */
/*global Cookie, window */

/**
 * Module pattern for Validation functions
 */
var SampleValidator = (function() {
  "use strict";

  var pub;

  // Public interface
  pub = {};

  /**
   * Check to see if a string is empty.
   * Leading and trailing whitespace are ignored.
   * @param textValue The string to check.
   * @return True if textValue is not just whitespace, false otherwise.
   */
  function checkNotEmpty(textValue) {
    return textValue.trim().length > 0;
  }

  /**
   * Check to see if a string contains just digits.
   * Note that an empty string is not considered to be 'digits'.
   * @param textValue The string to check.
   * @return True if textValue contains only the characters 0-9, false otherwise.
   */
  function checkDigits(textValue) {
    var pattern = /^[0-9]+$/;
    return pattern.test(textValue);
  }

  function checkPhoneDigit(textValue) {
    var pattern = /^[0-9]{4}$/;
    return pattern.test(textValue);
  }

  /**
   * Check to see if a string's length is in a given range.
   * This checks to see if the length of a string lies within [minLength, maxLength].
   * If no maxLength is given, it checks to see if the string's length is exactly minLength.
   * @param textValue The string to check.
   * @param minLength The minimum acceptable length
   * @param maxLength [optional] The maximum acceptable length
   * @return True if textValue is an acceptable length, false otherwise.
   */
  function checkLength(textValue, minLength, maxLength) {
    var length = textValue.length;
    if (maxLength === undefined) {
      maxLength = minLength;
    }
    return length >= minLength && length <= maxLength;
  }

  /**
   * Check if a key-press is a digit or not
   * @param event The event representing the key-press
   * @return True (accept) if key is a digit, False (reject) otherwise
   */
  function checkKeyIsDigit(event) {
    // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
    var characterPressed, zero, nine;
    zero = "0";
    nine = "9";
    characterPressed = event.keyCode || event.which || event.charCode;
    if (characterPressed < zero.charCodeAt(0)) {
      return false;
    }
    if (characterPressed > nine.charCodeAt(0)) {
      return false;
    }
    return true;
  }

  /**
   * Check to see if a string starts with a given substring
   *
   * @param textValue The string to check.
   * @param startValue The expected starting substring
   * @return True if textValue starts with startValue, False otherwise
   */
  function startsWith(textValue, startValue) {
    return textValue.substring(0, startValue.length) === startValue;
  }

  function checkEmail(textValue) {
    var pattern = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*$/;
    return pattern.test(textValue);
  }

  function checkLowerCase(keyPressEvent) {
    var keyCode = keyPressEvent.keyCode;
    if (keyCode < "A".charCodeAt(0)) {
      return false;
    } else if (keyCode > "Z".charCodeAt(0)) {
      return false;
    } else {
      return true;
    }
  }

  function checkName(fname, lname, messages) {
    if (!checkNotEmpty(fname)) {
      messages.push("Please enter a name");
    }
  }

  function checkemail(email, messages) {
    if (!checkNotEmpty(email)) {
      messages.push("Please enter a valid email address");
    } else if (!checkEmail(email)) {
      messages.push("Invalid email address");
    }
  }

  function checkMsg(msg, messages) {
    if (!checkNotEmpty(msg)) {
      messages.push("Please enter your message");
    }
  }

  function checkMobile(mobile, messages) {
    if (!checkNotEmpty(mobile)) {
      messages.push("Please enter a valid mobile number");
    }
  }

  /**
   * Validate the checkout form
   * Check the form entries before submission
   * @return False, because server-side form handling is not implemented. Eventually will return true on success and false otherwise.
   */
  function validateCheckout() {
    var messages, msg, mobile, fname, lname, phone, email, errorHTML;

    // Default assumption is that everything is good, and no messages
    messages = [];

    // Validate Address Details
    fname = $(".fname").val();
    lname = $(".lname").val();
    checkName(fname, lname, messages);

    //validate email address
    email = $(".email").val();
    checkemail(email, messages);

    //validate mobile number
    mobile = $(".mobile").val();
    checkMobile(mobile, messages);

    //validate msg
    msg = $(".msg").val();
    checkMsg(msg, messages);

    //console.log(messages.length);

    if (messages.length === 0) {
      // Checkout successful, clear the cart
      // Cookie.clear("myCart");
      // Display a friendly message
      // $("#finalMsg").html(
      //   "<p>Thank you for contacting me. I will get back to you soon.</p>"
      // );
      return;
    } else {
      // Report the error messages
      errorHTML =
        "<p><strong>There were errors while processing this contact form. Please correct it and submit again.</strong></p>";
      errorHTML += "<ul>";
      messages.forEach(function(msg) {
        errorHTML += "<li>" + msg;
      });
      errorHTML += "</ul>";
      $("#errors").html(errorHTML);
    }

    // Stop the form from submitting, which would trigger a page load
    // In future this will return true if the form is OK and can be submitted to the server
    return false;
  }

  /**
   * Setup function for sample validation.
   *
   * Adds validation to the form on submission.
   * Note that if the validation fails (returns false) then the form is not submitted.
   */
  pub.setup = function() {
    $(".contact-form").submit(validateCheckout);
    $(".mobile").keypress(checkKeyIsDigit);
    // $("#fname").keypress(checkLowerCase);
  };
  return pub;
})();

// The usual onload event handling to call SampleValidator.setup
// if (window.addEventListener) {
//     window.addEventListener('load', SampleValidator.setup);
// } else if (window.attachEvent) {
//     window.attachEvent('onload', SampleValidator.setup);
// } else {
//     alert("Could not attach 'SampleValidator.setup' to the 'window.onload' event");
// }

$(document).ready(SampleValidator.setup);
