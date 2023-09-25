# Angular Reactive Form - Pluralsight
- ng new projectName
- cd projectName
- npm start
- ng g c customers
- npm install bootstrap
- copy code in app.module.ts, app.component.html, styles.css, customers.ts, customers.component.ts, customers.component.html

## Template Driven
Check simple template driven form at https://github.com/jmgcheng/Angular-Template-Driven-Form-01-Pluralsight

## Note
- You can create froms in Angular by Template Driven OR ReactiveForm style
- If you choose ReactiveForm style, you can use (FormGroup + FormControl) OR (FormGroup + FormBuilder)
- FormBuilder makes your Reactive Forms FormGroup and FormControl code smaller and easier to code

## app.module.ts diff - Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
```
Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
    Template Driven
        FormsModule 
    ReactiveForm (FormGroup + FormControl) OR FormBuilder
        ReactiveFormsModule
```

## customers.component.ts - Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
```
Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
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

## customers.component.html - Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
```
Template Driven VS ReactiveForm (FormGroup + FormControl) OR FormBuilder
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

## Reactive Forms - accessing the form model properties - 30:14
- 1
```
customerForm.controls.firstName.valid
```
- 2
```
customerForm.get('firstName').valid
```
- or 3
```
firstName = new FormControl();
ngOnInit(): void {
    this.customerForm = new FormGroup({
        firstName: this.firstName,
        ...
    });
}
```

## Reactive Forms - setValue and patchValue - 33:21
- setValue. to set the value of every FormControl in the form model
- pathValue. set a subset of values

## Reactive Forms - adjusting validation rules at runtime - 42:35
- 1
```
myControl.setValidators(Validators.required);
```
- 2
```
myControl.setValidators([Validators.required, Validators.maxLength(30)]);
```
- 3
```
myControl.clearValidators();
```
- then 4
```
myControl.updateValueAndValidity();
```

