/*
  note that template driven form code are almost in the component
*/ 

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
/*
  FormGroup, FormControl
    - Reactive Form style WITHOUT FormBuilder
  FormGroup, FormBuilder
    - Reactive Form style USING FormBuilder
*/ 

import { debounceTime } from 'rxjs/operators';
/*
  debounceTime - for delay checking of keypress when entering email
*/ 

import { Customer } from './customers';
/*
  Customer - use as a class
*/ 

/* 
  emailMatcher
    - custom cross-field validator
    - checks to see if email and confirmEmail are ===
*/
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;  // return null if valid
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;  // return null if valid
  }
  return { match: true }; // this means we are not valid
}

/* 
  custom validator that doesn't use parameters
  // usage
  //    rating: [null, ratingRange]
  function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
    if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5 )) {
      return { 'range': true }; // this means we are not valid
    }
    return null; // return null if valid
  } 
*/


/* 
  custom validator that use parameters
  // usage
  //    rating: [null, ratingRange(1, 5)]
  just a sample on how to setup a custom validator
  checks to see that input should be number and between 1 to 5
*/
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true }; // this means we are not valid
    }
    return null; // return null if valid
  };
}





@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  /*
    !
      - you can disable TypeScript's strict property initialization checks for this property. You can do this by adding the ! 
      - This tells TypeScript that you'll ensure customerForm is initialized in the ngOnInit method, and it shouldn't check it for strict initialization.
    customerForm
      - this is like our form. This is the form. 
      - below in ngOnInit, you specify whats inside(fields, inputs) in your form using a form builder this.fb.group({...})
  */ 

  customer: Customer = new Customer();
  /*
    customer - use as instance of a customer
  */


  emailMessage: string = '';
  private validationMessages: { [key: string]: string }  = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  }  
  /* 
    emailMessage
      - she used this one to show you how you can setup the trapping errors from the template to here in the component
      - by doing this style, your html will look cleaner
    validationMessages
      - she shows you that you can setup it here in component just in case message came from database or foreign language
  */


  /* 
    returns a FormArray
    we use the customerForm.get method to get the reference to the FormArray and return it
    use to setup dynamically duplicating the addresses
    addresses
      - returns the this.customerForm.get('addresses') in an Array so you can push more of the same group below
  */
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }



  
  constructor(private fb: FormBuilder) { }




  ngOnInit(): void {
    /* 
      this.customerForm
        - this is the form
        - we use this.fb.group to setup its input fields that match the the template
            eg.
              component
                firstName: ['', [Validators.required, Validators.minLength(3)]], 
              html
                <input ... formControlName="firstName" ...  />
    */
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]], 
      // ['firstParamIsDefault', ['moreParamsForValidator'], ['forAsyncValidatorsDaw']]
      lastName: ['', [Validators.required, Validators.maxLength(50)]], 

      emailGroup: this.fb.group({ // idk why group here suddenly has a strikethrough seen id IDE only
        email: ['', [Validators.required, Validators.email]], 
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}), // emailMatcher here is a custom cross-field validator that we created for matching emails only. Required and other validators are seperate

      phone: '',
      notification: 'email',

      // rating: [null, [Validators.min(1), Validators.max(5)]], we can use this for this situation but opt to use custom validator to see how it works
      rating: [null, ratingRange(1, 5)], // ratingRange here is a custom validator that we created

      sendCatalog: true,

      addresses: this.fb.array([ this.buildAddress() ]),
      /* 
        addresses
          - addresses here is an FormArray and we setup the first default FormGroup inside
      */


    });



    this.customerForm.get('notification')?.valueChanges.subscribe(
      value => this.setNotification(value)
    );
    /* 
      valueChanges
        - take note that every field in the form are observables, as to why we can subscribe
        - example use to dyanmically set the validators of notification at runtime
    */


    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(
      debounceTime(1000) // wait 1sec to setMessage for check errors of email
    ).subscribe(
      value => this.setMessage(emailControl)
    );
    /* 
      valueChanges
        - take note that every field in the form are observables, as to why we can subscribe
    */



  }
  /*
    setting default value in FormControl style
      - FormControl(defaultValue)
    setting default value in FormBuilder style
      1
        firstName: ''
      2
        firstName: {value: 'n/a', disabled: true, ...}
      3
        firstName: ['', [Validators], asyncValidators]
        lastName: [{{value: 'n/a', disabled: true}}]
    FormGroup + FormControl 
      customerForm!: FormGroup;
      ngOnInit(): void {
        this.customerForm = new FormGroup({
          firstName: new FormControl(),
          lastName: new FormControl(),
          email: new FormControl(),
          sendCatalog: new FormControl(true)
        });
      }      
  */ 


  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }


  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    })
  }


  populateTestData(): void {
    /* 
      this.customerForm.setValue({
        firstName: 'Jack',
        lastName: 'Harkness',
        email: 'jack@torchwood.com',
        sendCatalog: false
      }); 
    */
    this.customerForm.patchValue({
      email: 'jack@torchwood.com',
    });
    /*
      setValue - to set the value of every FormControl in the form model
      pathValue - set a subset of values    
    */ 
  }

  
  /* 
    Template Driven VS ReactiveForm (FormGroup + FormControl)
      Template Driven
        console.log(customerForm.form);
        console.log('Saved: ' + JSON.stringify(customerForm.value));        
      ReactiveForm (FormGroup + FormControl)
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm));      
  */
  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }


  /* 
    emailMessage
      - she used this one to show you how you can setup the trapping errors from the template to here in the component
      - by doing this style, your html will look cleaner
    validationMessages
      - she shows you that you can setup it here in component just in case message came from database or foreign language
    setMessage
      - this is how you setup {'is-invalid': ... } from html to here component
      - note that this is only for email catching error, not confirmEmail.
      - this function does not do anything with the emailMatcher custom validator
  */  
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }


  /* 
    setNotification
      - example use to dyanmically set the validators of notification at runtime
  */
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if(notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    }
    else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity(); // always call updateValueAndValidity to update validtor properly
  }
}