import {
   ComponentFixture,
   TestBed
} from '@angular/core/testing';
import {
   HarnessLoader
} from '@angular/cdk/testing';
import {
   TestbedHarnessEnvironment
} from '@angular/cdk/testing/testbed';
import {
   NgModule,
   CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
   BrowserModule,
   By
} from '@angular/platform-browser';
import {
   ReactiveFormsModule,
   NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
   FormBuilder,
   FormGroup,
   Validators,
   NG_VALIDATORS
} from '@angular/forms';
import {
   FormWizardComponent
} from './form-wizard.component';
import {
   MatStepperModule
} from '@angular/material/stepper';
import {
   MatInputModule
} from '@angular/material/input';
import {
   MatButtonModule
} from '@angular/material/button';
import {
   MatFormFieldModule
} from '@angular/material/form-field';
import {
   MatRippleModule
} from '@angular/material/core';
import {
   BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
   MatSliderModule
} from '@angular/material/slider';
import {
   MatIconModule
} from '@angular/material/icon';
import {
   MatStepperHarness
} from '@angular/material/stepper/testing';
import {
   createLoanDownPaymentValidator
} from '../validators/loan-down-payment.validator';
import {
   MatSliderHarness
} from '@angular/material/slider/testing';
let loader: HarnessLoader;
describe('FormWizardComponent', () => {
   let component: FormWizardComponent;
   let fixture: ComponentFixture < FormWizardComponent > ;
   let formBuilder: FormBuilder;
   let isEditable = true;
   beforeEach(async () => {
      imports: [
         BrowserModule,
         BrowserAnimationsModule,
         ReactiveFormsModule,
         MatStepperModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSliderModule,
         MatInputModule,
         MatRippleModule,
         MatIconModule
      ]
      await TestBed.configureTestingModule({
         declarations: [FormWizardComponent],
         imports: [ReactiveFormsModule, BrowserAnimationsModule, MatStepperModule, MatSliderModule, MatButtonModule,
            MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule
         ],
         providers: [
            FormBuilder,
            {
               provide: NG_VALIDATORS,
               useExisting: createLoanDownPaymentValidator,
            }
         ],
         schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
   });
   beforeEach(() => {
      fixture = TestBed.createComponent(FormWizardComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      formBuilder = TestBed.inject(FormBuilder);
      component = fixture.componentInstance;
      component.firstFormGroup = formBuilder.group({
         firstCtrlName: ['', Validators.required],
         firstCtrlAddress: ['', [Validators.required]],
      });
      fixture.detectChanges();
      component.secondFormGroup = formBuilder.group({
         secondCtrlIncome: ['', Validators.required],
      });
      fixture.detectChanges();
      component.thirdFormGroup = formBuilder.group({
         thirdCtrlDownPayment: ['', Validators.required],
      });
      fixture.detectChanges();
      component.fourthFormGroup = formBuilder.group({
         fourthCtrlDownPayment: component.thirdFormGroup,
         fourthCtrlLoanAmount: ['', Validators.required],
      }, {
         validator: [createLoanDownPaymentValidator.loanValidator]
      });
      fixture.detectChanges();
   });
   it('First form group test', () => {
      expect(component).toBeTruthy();
      const element: HTMLElement = fixture.nativeElement;
      //on init the applicant button should be active
      const applicant = element.querySelector('button[color="primary"]');
      expect(applicant!.textContent).toEqual("Applicant");
      //Try to click next without filling first name and address
      const button = element.querySelector('[matStepperNext]') as HTMLElement;
      button!.click();
      fixture.detectChanges();
      const nameField: HTMLElement = element.querySelector('[formcontrolname="firstCtrlName"]') as HTMLElement;
      expect(nameField!.classList.contains('ng-invalid')).toBe(true);
      const addressField: HTMLElement = element.querySelector('[formcontrolname="firstCtrlAddress"]') as HTMLElement;
      expect(addressField!.classList.contains('ng-invalid')).toBe(true);
      //after filling first form group data form should move to next group
      (element.querySelector('[formcontrolname="firstCtrlName"]') as any).value = 'Debajan';
      (element.querySelector('[formcontrolname="firstCtrlAddress"]') as any).value = 'Swedbank office';
      //nameInput!.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const nameInput = element.querySelector('[formcontrolname="firstCtrlName"]') as any;
      //console.log(nameInput!.value);
      nameInput.dispatchEvent(new Event('input'));
      const addressInput = element.querySelector('[formcontrolname="firstCtrlAddress"]') as any;
      //console.log(addressInput!.value);
      addressInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //the error messages should be gone after form fields are filled with right value
      expect(nameInput!.classList.contains('ng-invalid')).toBe(false);
      expect(addressInput!.classList.contains('ng-invalid')).toBe(false);
      button!.click();
      fixture.detectChanges();
      //next section which is Total monthly income should be active
      const totIncome = element.querySelector('button[color="primary"]');
      expect(totIncome!.textContent).toEqual("Total monthly income");
   });
   it('Second FormGroup test', async () => {
      expect(component).toBeTruthy();
      const element: HTMLElement = fixture.nativeElement;
      //forward to second form group
      const steps = [1];
      steps.forEach(function(arrayItem) {
         switch (arrayItem) {
            case 1: {
               (element.querySelector('[formcontrolname="firstCtrlName"]') as any).value = 'Debajan';
               (element.querySelector('[formcontrolname="firstCtrlAddress"]') as any).value = 'Swedbank office';
               const nameInput = element.querySelector('[formcontrolname="firstCtrlName"]') as any;
               const addressInput = element.querySelector('[formcontrolname="firstCtrlAddress"]') as any;
               nameInput.dispatchEvent(new Event('input'));
               addressInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
         };
      });
      const monthlyIncome = element.querySelector('button[color="primary"]');
      //console.log(monthlyIncome!.textContent);
      expect(monthlyIncome!.textContent).toEqual("Total monthly income");
      //Try to click next without filling Total monthly income
      const button = element.querySelector('[matStepperNext]') as HTMLElement;
      button!.click();
      fixture.detectChanges();
      const monthlyIncomeField: HTMLElement = element.querySelector('[formcontrolname="secondCtrlIncome"]') as HTMLElement;
      expect(monthlyIncomeField!.classList.contains('ng-invalid')).toBe(true);
      //after filling second form group data form should move to next group
      (element.querySelector('[formcontrolname="secondCtrlIncome"]') as any).value = 4000;
      const monthlyIncomeInput = element.querySelector('[formcontrolname="secondCtrlIncome"]') as any;
      monthlyIncomeInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button!.click();
      fixture.detectChanges();
      const downPayment = element.querySelector('button[color="primary"]');
      expect(downPayment!.textContent).toEqual("Down payment");
   });
   it('Third FormGroup test', async () => {
      expect(component).toBeTruthy();
      const element: HTMLElement = fixture.nativeElement;
      //forward to third form group
      const steps = [1, 2];
      steps.forEach(function(arrayItem) {
         switch (arrayItem) {
            case 1: {
               (element.querySelector('[formcontrolname="firstCtrlName"]') as any).value = 'Debajan';
               (element.querySelector('[formcontrolname="firstCtrlAddress"]') as any).value = 'Swedbank office';
               const nameInput = element.querySelector('[formcontrolname="firstCtrlName"]') as any;
               const addressInput = element.querySelector('[formcontrolname="firstCtrlAddress"]') as any;
               nameInput.dispatchEvent(new Event('input'));
               addressInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
            case 2: {
               (element.querySelector('[formcontrolname="secondCtrlIncome"]') as any).value = 4000;
               const monthlyIncomeInput = element.querySelector('[formcontrolname="secondCtrlIncome"]') as any;
               monthlyIncomeInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
         };
      });
      const downPayment = element.querySelector('button[color="primary"]');
      //console.log(downPayment!.textContent);
      expect(downPayment!.textContent).toEqual("Down payment");
      //Try to click next without filling Down payment
      const button = element.querySelector('[matStepperNext]') as HTMLElement;
      button!.click();
      fixture.detectChanges();
      const downPaymentField: HTMLElement = element.querySelector('[formcontrolname="thirdCtrlDownPayment"]') as HTMLElement;
      expect(downPaymentField!.classList.contains('ng-invalid')).toBe(true);
      //after filling third form group data form should move to next group
      (element.querySelector('[formcontrolname="thirdCtrlDownPayment"]') as any).value = 2000;
      const downPaymentInput = element.querySelector('[formcontrolname="thirdCtrlDownPayment"]') as any;
      downPaymentInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      button!.click();
      fixture.detectChanges();
      const loanAmount = element.querySelector('button[color="primary"]');
      expect(loanAmount!.textContent).toEqual("Choose loan amount");
   });
   it('Fourth FormGroup test', async () => {
      expect(component).toBeTruthy();
      const element: HTMLElement = fixture.nativeElement;
      //forward to fourth form group
      const steps = [1, 2, 3];
      steps.forEach(function(arrayItem) {
         switch (arrayItem) {
            case 1: {
               (element.querySelector('[formcontrolname="firstCtrlName"]') as any).value = 'Debajan';
               (element.querySelector('[formcontrolname="firstCtrlAddress"]') as any).value = 'Swedbank office';
               const nameInput = element.querySelector('[formcontrolname="firstCtrlName"]') as any;
               const addressInput = element.querySelector('[formcontrolname="firstCtrlAddress"]') as any;
               nameInput.dispatchEvent(new Event('input'));
               addressInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
            case 2: {
               (element.querySelector('[formcontrolname="secondCtrlIncome"]') as any).value = 4000;
               const monthlyIncomeInput = element.querySelector('[formcontrolname="secondCtrlIncome"]') as any;
               monthlyIncomeInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
            case 3: {
               (element.querySelector('[formcontrolname="thirdCtrlDownPayment"]') as any).value = 2000;
               const downPaymentInput = element.querySelector('[formcontrolname="thirdCtrlDownPayment"]') as any;
               downPaymentInput.dispatchEvent(new Event('input'));
               fixture.detectChanges();
               const button = element.querySelector('[matStepperNext]') as HTMLElement;
               button!.click();
               fixture.detectChanges();
               break;
            }
         };
      });
      const loanAmount = element.querySelector('button[color="primary"]');
      //console.log(loanAmount!.textContent);
      expect(loanAmount!.textContent).toEqual("Choose loan amount");
      //Try to click next with down payment and loan amount difference being less than 15%
      component.fourthFormGroup.controls['fourthCtrlLoanAmount'].setValue(40000);
      fixture.detectChanges();
      const button = element.querySelector('[matStepperNext]') as HTMLElement;
      button!.click();
      fixture.detectChanges();
      expect(component.fourthFormGroup.hasError('loanDownPaymentError')).toBe(true);
      //Set such a loan amount that makes 2000 down payment between 15% and 80%
      component.fourthFormGroup.controls['fourthCtrlLoanAmount'].setValue(10000);
      fixture.detectChanges();
      const button2 = element.querySelector('[matStepperNext]') as HTMLElement;
      button2!.click();
      fixture.detectChanges();
      const done = element.querySelector('button[color="primary"]');
      expect(done!.textContent).toEqual('Done');
   });
});