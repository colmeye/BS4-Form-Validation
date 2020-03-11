# BS4-Form-Validation
Responsive jQuery & es6 form validation for Bootstrap 4. It highlights inputs red or green while editing if the content meets requirements. If there is an issue with any of the inputs, form submission will be disabled until the user makes a change.


# Setup

#### Requirements

* Bootstrap 4
* jQuery

#### Usage

1. Link the script into the head of the html file using:
```
<script type="text/javascript" src="PATH_TO_FILE/bs4-form-validation.js"></script>
```

2. Enter javascript tags before the last body tag. Create an object using the Validation class which will represent the entire form. The form's Id should be the class parameter and a string. The submit button should be formatted as `<input type="submit">` to work properly.
```
<script>

// Create the object for the form
let myForm = new Validation("FORM_NAME");

</script>
```

3. Add functions to the object for each input you'd like checked.
```
<script>

// Create the object for the form
let myForm = new Validation("FORM_Id");

// Inputs you would like to validate
myForm.requireText(inputId, minLength, maxLength, illegalCharArray, necessaryCharArray);
myForm.requireEmail(inputId, minLength, maxLength, illegalCharArray, necessaryCharArray);

</script>
```

4. Check out the documentation below for more info on how the functions work!

# Function Documentation

#### requireText(inputId, minLength, maxLength, illegalCharArray, necessaryCharArray);

* inputId (String)
  * The Id of the input

* minLength (Int)
  * Minimum allowable length of input value
  * -1 can be used if input can be empty

* maxLength (Int)
  * Maximum allowable length of input value

* illegalCharArray (Array)
  * An array containing strings of anything not allowed in the input
  * Ex: `requireText(inputId, minLength, maxLength, ["illegal", "/", " ", "@"], necessaryCharArray);`
  * ^ This code will not allow the strings "illegal", "/", spaces, or "@" in the input.

* necessaryCharArray (Array)
  * An array containing strings of anything needed in the input
  * All items in the array are necessary

#### requireEmail(inputId, minLength, maxLength, illegalCharArray, necessaryCharArray);

* Performs all operations that requireText() does
* Also ensures input matches common email layout
* Arguments operate exactly the same as the requireText ones

#### registerPassword(inputId, minLength, maxLength, illegalCharArray, necessaryCharArray, passConfirmId);

* Performs all operations that requireText() does
* Also requires input to contain a number and special character
* passConfirmId (String)
  * String containing the Id of a "Confirm your password" input