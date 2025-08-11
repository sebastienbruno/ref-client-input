import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { RefClient } from "./ref-client.model";

export class CustomValidators {

    static refClientRequired(control: AbstractControl): ValidationErrors | null {
        return refClientRequiredValidator(control);
    }
}

export function refClientRequiredValidator(control: AbstractControl): ValidationErrors | null {
    let errorsOrNull: ValidationErrors | null = null;
    const refClient: RefClient = control.value;
    const emetIdenValue = refClient.emetIden;
    const actiIdenValue = refClient.actiIden;
    if (!emetIdenValue && !actiIdenValue) {
        errorsOrNull = {
            'required': {
                'emetIden': true,
                'actiIden': true,
            }
        };
    } else if (!emetIdenValue) {
        errorsOrNull = {
            'required': {
                'emetIden': true,
            }
        };
    } else if (!actiIdenValue) {
        errorsOrNull = {
            'required': {
                'actiIden': true,
            }
        };
    }
    return errorsOrNull;
}