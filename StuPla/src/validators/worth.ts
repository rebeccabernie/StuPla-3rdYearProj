import { FormControl } from '@angular/forms';
 
// Validator code adapted from https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/

export class WorthValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Please enter a number from 1-100": true
            };
        }
 
        if(control.value <= 0 && control.value > 100){
            return {
                "Please enter a number between 1 and 100!": true
            };
        }
 
        return null; // If no condition is met then the validation succeeded so return nothing
    }
 
}