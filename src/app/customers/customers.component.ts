/*
  note that template driven form code are almost in the component
*/ 

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
/*
  FormGroup, FormControl  
    - Reactive Form style WITHOUT FormBuilder require FormGroup and FormControl here in component AND ReactiveFormsModule in app.module.ts
*/ 


import { Customer } from './customers';
/*
  Customer - use as a class
*/ 


@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  /*
    !
      you can disable TypeScript's strict property initialization checks for this property. You can do this by adding the ! 
      This tells TypeScript that you'll ensure customerForm is initialized in the ngOnInit method, and it shouldn't check it for strict initialization.
  */ 
  customer: Customer = new Customer();
  /*
    customer - use as instance of a customer
  */
  
  constructor() { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
  }
  /*
    setting default value in FormControl style
      - FormControl(defaultValue)
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
}