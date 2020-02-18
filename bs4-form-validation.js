/*
Author:     colmeye
Purpose:    Allow simple responsive input validation options in Bootstrap 4.

Usage:
        1. Add form-control class to all inputs.

        2. Paste this code near bottom of page:
                <script type="text/javascript" src="<?php echo $BASE_URL;?>csb-themes/default/js/input-validation.js"></script>
                <script type="text/javascript">
                    // Create object
                    let OBJNAME = new Validation("FORM NAME");
                    // Validation Functions
                </script>

        3. Use the following function to check for string issues:
                OBJNAME.checkString(inputName, minLength, maxLength, illegalCharArray, necessaryCharArray)

        4. Note: This script uses the NAME of the input, NOT the id.
*/



class Validation
{
    constructor(formName)
    {
        this.form = $('form[name ="' + formName + '"]');
        this.validC = "is-valid";
        this.invalidC = "is-invalid";
    }



      ////////////////////
     // Main Functions //
    ////////////////////
    /*
        The functions in this category are called by developers to add a responsive layer of form validation
    */

    checkString(inputName, minLength, maxLength, illegalCharArray, necessaryCharArray)
    {

        let input = $('input[name ="' + inputName + '"]');
        let invalidString = "";

        // Create requried *
        this.createAsterisk(input);
            
        // Check string for issues while editing
        $(input).on('input focus', input, () =>
        {
            // Append any invalid issues to string when editing
            invalidString = "";
            invalidString += this.lengthFlag(input, minLength, maxLength);
            invalidString += this.illegalCharFlag(input, illegalCharArray);
            this.applyRestrictions(input, inputName, invalidString);
        });

        // Check string for issues after editing
        $(input).on('focusout', input, () =>
        {
            invalidString += this.necessaryCharFlag(input, necessaryCharArray);
            this.applyRestrictions(input, inputName, invalidString)
            this.removeValid(input);
        });

    }





      /////////////////
     // Flag Checks //
    /////////////////
    /*
        Flag checks return nothing if there are no validation issues.
        If there is a validation issue, a string is returned that explains the issue.
        The main functions call these depending on their parameters.
    */

    // Checks if too long or short
    lengthFlag(input, minLength, maxLength)
    {
        if (input.val().length <= minLength)
        {
            return "Must be longer than " + minLength + " characters. ";
        }
        else if (input.val().length >= maxLength)
        {
            return "Must be shorter than " + maxLength + " characters. ";
        }
        else
        {
            return "";
        }
    }

    // Checks if contains unwanted text
    illegalCharFlag(input, illegalCharArray)
    {

        // Reset loop stringe
        let illegalsUsed = "";
        // loop through each illegal item to check for
        $(illegalCharArray).each(function()
        {
            if (input.val().indexOf(this) >= 0)
            {
                // Append illegal strings to var
                // check if char is a space
                if (!this.trim().length == 0)
                {
                    illegalsUsed += " " + this;   
                }
                else
                {
                    illegalsUsed += " spaces"
                }
                
            }
        });

        // Create output based on result of illegals concatination
        if (illegalsUsed === "")
        {
            return "";
        }
        else
        {
            return "Cannot use:" + illegalsUsed + ". ";
        }

    }

    // Check if doesnt contain needed text
    necessaryCharFlag(input, necessaryCharArray)
    {

        let notUsed = "";

        // loop through each illegal item to check for
        $(necessaryCharArray).each(function()
        {
            if (!(input.val().indexOf(this) >= 0))
            {
                notUsed += " " + this;
            }
        });

        // Create output based on result of illegals concatination
        if (notUsed === "")
        {
            return "";
        }
        else
        {
            return "Must contain:" + notUsed + ". ";
        }

    }


      ////////////////////
     // Class Updating //
    ////////////////////
    /*
        Simplifies redundant class code into a few functions
    */

    // Perform restrictions depending on the input
    applyRestrictions(input, inputName, invalidString)
    {
        // Provide proper styling and feedback
        if (invalidString)
        {
            this.generateFeedback(input, inputName, "invalid-feedback", invalidString);
            this.makeInvalid(input);
        }
        else
        {
            this.makeValid(input);
        }
    }

    // Adds a valid class to element and removes invalid
    makeValid(element)
    {
        if (!element.hasClass(this.validC))
        {
            element.addClass(this.validC);
        }
        // Remove invalid class if it exists
        if (element.hasClass(this.invalidC))
        {
            element.removeClass(this.invalidC);
        }
    }

    // Adds a valid class to element and removes invalid
    removeValid(element)
    {
        // Remove invalid class if it exists
        if (element.hasClass(this.validC))
        {
            element.removeClass(this.validC);
        }
    }

    // adds invalid class to element and removes valid class
    makeInvalid(element)
    {
        if (!element.hasClass(this.invalidC))
        {
            element.addClass(this.invalidC);
        }
        // Remove valid class
        if (element.hasClass(this.validC))
        {
            element.removeClass(this.validC);
        }
    }


      /////////////////////
     // Text Generation //
    /////////////////////
    /*
        Visual output such as errors or *
    */

    // Create required asterisk after text
    createAsterisk(input)
    {
        $("<span class='text-danger'>*</span>").insertBefore(input)
    }

    // Creates responsive tiny text below inputs to inform user of issues
    generateFeedback(input, inputName, validityClass, prompt)
    {
    /*
    validity classes: valid-feedback or invalid-feedback
    */
        if ($('#' + inputName + '-feedback').length)
        {
            // Delete feedback if it already exists to make room for new content
            $('#' + inputName + '-feedback').remove();
            // Create new content
            $("<div id='" + inputName + "-feedback' class='" + validityClass + "'>" + prompt + "</h2>").insertAfter(input);
            
        }
        else
        {
            // Create feedback element if it does not exist
            $("<div id='" + inputName + "-feedback' class='" + validityClass + "'>" + prompt + "</h2>").insertAfter(input);
        }
    }






}












