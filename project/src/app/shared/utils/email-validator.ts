import { ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    const regExp = new RegExp(`[A-Za-z0-9]+@[a-z]+\.[a-z]+`)
    return (control) => {
        return control.value==='' || regExp.test(control.value)
        ? null
        : {emailValidator: true}
    }
}