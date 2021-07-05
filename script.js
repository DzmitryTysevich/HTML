document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const form = document.querySelector("form")
    const passKeeper = form.querySelector(".inputPassword")
    const passConfirm = form.querySelector(".confirmInputPassword")

    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    const regExpPhone = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
    const regExpPassword = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
    const regExpName = /^[a-z ,.'-]+$/i

    const validateElem = (elem) => {

        if (elem.name === "fname") {
            isInputError(elem, regExpName, "Input correct name. The name consists only of Latin letters")
        }
        if (elem.name === "lname") {
            isInputError(elem, regExpName, "Input correct name. The name consists only of Latin letters")
        }
        if (elem.name === "email") {
            isInputError(elem, regExpEmail, "Input correct Email")
        }
        if (elem.name === "phone") {
            isInputError(elem, regExpPhone, "Input correct phone number")
        }
        if (elem.name === "inputPassword") {
            isInputError(elem, regExpPassword, "Your password is not strong")
        }
        if (elem.name === "confirmInputPassword") {
            if (passKeeper.value === passConfirm.value) {
                elem.nextElementSibling.textContent = ""
            } else {
                isInputError(elem, regExpPassword, "Confirm correct password")
            }
        }
    }

    for (let elem of form.elements) {
        if (!elem.classList.contains("checkBox") && elem.tagName !== "BUTTON") {
            elem.addEventListener("blur", () => {
                validateElem(elem)
            })
        }
    }

    form.addEventListener("submit", (even) => {
        even.preventDefault()
        for (let elem of form.elements) {
            if (!elem.classList.contains("checkBox") && elem.tagName !== "BUTTON") {
                isEmptyError(elem)
            }
        }
    })

    function isEmptyError(elem) {
        if (elem.value === "") {
            elem.nextElementSibling.textContent = "This field is empty!"
        } else {
            elem.nextElementSibling.textContent = ""
        }
    }

    function isInputError(elem, expression, message) {
        if (!expression.test(elem.value) && elem.value !== "") {
            elem.nextElementSibling.textContent = message
        } else {
            elem.nextElementSibling.textContent = ""
        }
    }
})