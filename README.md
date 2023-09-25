# Angular Reactive Form - Pluralsight
- ng new projectName
- cd projectName
- npm start
- ng g c customers
- npm install bootstrap
- copy code in app.module.ts, app.component.html, styles.css, customers.ts, customers.component.ts, customers.component.html

## app.module.ts diff - Template Driven VS ReactiveForm (FormGroup + FormControl)
```
Template Driven VS ReactiveForm (FormGroup + FormControl)
    Template Driven
        FormsModule 
    ReactiveForm (FormGroup + FormControl)
        ReactiveFormsModule
```

## customers.component.ts - Template Driven VS ReactiveForm (FormGroup + FormControl)
```
Template Driven VS ReactiveForm (FormGroup + FormControl)
    Template Driven
        console.log(customerForm.form);
        console.log('Saved: ' + JSON.stringify(customerForm.value));                
    ReactiveForm (FormGroup + FormControl)
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm));      

        import { FormGroup, FormControl } from '@angular/forms';
        customerForm!: FormGroup;
        ngOnInit(): void {
            this.customerForm = new FormGroup({
                firstName: new FormControl(),
                lastName: new FormControl(),
                email: new FormControl(),
                sendCatalog: new FormControl(true)
            });
        }        
```

## customers.component.html - Template Driven VS ReactiveForm (FormGroup + FormControl)
```
Template Driven VS ReactiveForm (FormGroup + FormControl)
    Template Driven
        [(ngModel)]=customer.firstName
        name="firstName"
        #firstNameVar="ngModel"
        [ngClass]="{'is-invalid': (firstNameVar.touched || firstNameVar.dirty) && !firstNameVar.valid }
        *ngIf="firstNameVar.errors?.['required']
    ReactiveForm (FormGroup + FormControl)
        formControlName="firstName"
        [ngClass]="{'is-invalid': (customerForm.get('firstName')?.touched || customerForm.get('firstName')?.dirty) && !customerForm.get('firstName')?.valid }"
        *ngIf="customerForm?.get('firstName')?.errors?.['required']"
```