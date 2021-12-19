import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {createLoanDownPaymentValidator} from '../validators/loan-down-payment.validator';
import { StepperOrientation } from '@angular/cdk/stepper';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: [
    './form-wizard.component.css'
    ],
 
})
export class FormWizardComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isEditable = true;
  orientation: StepperOrientation = 'vertical';
  
  constructor(private _formBuilder: FormBuilder) {

  	this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({});
    this.fourthFormGroup = this._formBuilder.group({});
    //this.fifthFormGroup = this._formBuilder.group({});
  }

  ngOnInit(): void {
  
  	this.firstFormGroup = this._formBuilder.group({
      firstCtrlName: ['', [Validators.required,Validators.minLength(3)]],
      firstCtrlAddress: ['', [Validators.required,Validators.minLength(5)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrlIncome: ['', [Validators.required,Validators.min(1000),Validators.pattern("^[0-9]*$")]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrlDownPayment: ['', [Validators.required,Validators.min(1000),Validators.pattern("^[0-9]*$")]],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrlDownPayment : this.thirdFormGroup,
      fourthCtrlLoanAmount: ['', [Validators.required,Validators.min(1000),Validators.pattern("^[0-9]*$")]],
    },
    {
      validator:[createLoanDownPaymentValidator.loanValidator]
    }

    ); 
  }
  toggleOrientation() {
    this.orientation = this.orientation === 'vertical' ? 'horizontal' : 'vertical';
  }
}
