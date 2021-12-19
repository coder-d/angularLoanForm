import {FormGroup, ValidatorFn, Validators,ValidationErrors} from '@angular/forms';

export class createLoanDownPaymentValidator extends Validators{

    static loanValidator(fdValue: FormGroup) {

        const downPayment = parseInt(fdValue.get('fourthCtrlDownPayment')?.value['thirdCtrlDownPayment']);
        const loanAmount = parseInt(fdValue.get('fourthCtrlLoanAmount')?.value);
        if ((((loanAmount * 15)/100) > downPayment) || (((loanAmount * 80)/100) < downPayment)) {

            return {loanDownPaymentError:true};
        }
        else{
            return null;
        }
        return {loanDownPaymentError:true}
    }
}

