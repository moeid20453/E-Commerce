let joi = require('joi');


module.exports = {
    confirmPasswordVlidation : {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','net','org']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }) 
        })
    },
    addUserValidation: {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','net','org']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }),
             firstName: joi.string().empty().required().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid First Name",
                "string.empty" : "FirstName cannot be empty",
                "any.required" : "please enter a FirstName",
                "string.pattern.base" : "please enter a valid FirstName A-Z,a-z, 1-9,special characters"
             }),
             lastName: joi.string().empty().required().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             address: joi.string().empty().optional().messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             billadress: joi.string().empty().optional().messages({
              "string.base" : "please enter a valid Last Name",
              "string.empty" : "LastName cannot be empty",
              "any.required" : "please enter a LastName",
              "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
           })
        })
    },
    updateUserValidation: {
        body: joi.object().optional().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow:['com','net','org']}}).empty().optional().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "please enter an email",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().optional().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "please enter a password",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z, 1-9,special characters"
            }),
             firstName: joi.string().empty().optional().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid First Name",
                "string.empty" : "FirstName cannot be empty",
                "any.required" : "please enter a FirstName",
                "string.pattern.base" : "please enter a valid FirstName A-Z,a-z, 1-9,special characters"
             }),
             lastName: joi.string().empty().optional().pattern (new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             address: joi.string().empty().optional().messages({
                "string.base" : "please enter a valid Last Name",
                "string.empty" : "LastName cannot be empty",
                "any.required" : "please enter a LastName",
                "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
             }),
             billadress: joi.string().empty().optional().messages({
              "string.base" : "please enter a valid Last Name",
              "string.empty" : "LastName cannot be empty",
              "any.required" : "please enter a LastName",
              "string.pattern.base" : "please enter a valid LastName A-Z,a-z, 1-9,special characters"
           })
        })
    }
}