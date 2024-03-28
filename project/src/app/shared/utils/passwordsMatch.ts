import { FormGroup, ValidatorFn } from "@angular/forms"

export function passwordsMatch(
    passwordOne: string,
    passwordTwo: string
): ValidatorFn {
    return (control) => {
        const group = control as FormGroup;
        const pass1 = group.get(passwordOne);
        const pass2 = group.get(passwordTwo);

        //console.log({pass1});
        //console.log({pass2});
        return pass1?.value === pass2?.value
           ? null
           : { passwordsMatch: true }
    }
}
