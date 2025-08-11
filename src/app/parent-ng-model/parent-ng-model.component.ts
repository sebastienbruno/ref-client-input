import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RefClientInputNgModelComponent } from '../ref-client-input-ng-model/ref-client-input-ng-model.component';
import { NumericInputDirective } from '../numeric-input.directive';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RefClient } from '../ref-client.model';
import { CustomValidators } from '../custom-validators';

interface FormModel {
  simpleInput: FormControl<string>,
  refClient: FormControl<RefClient>,
}

const initialFormState: {simpleInput: string, refClient: RefClient} = {
  simpleInput: '',
  refClient: {
    emetIden: '',
    actiIden: '',
  }  
};

@Component({
  selector: 'app-parent-ng-model',
  standalone: true,
  imports: [
    CommonModule,
    RefClientInputNgModelComponent,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './parent-ng-model.component.html',
  styleUrls: ['./parent-ng-model.component.scss']
})
export class ParentNgModelComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly formGroup: FormGroup<FormModel> = this.formBuilder.group({
    simpleInput: this.formBuilder.control('', Validators.required),
    refClient: this.formBuilder.control({emetIden: '', actiIden: ''}, CustomValidators.refClientRequired),
  })

  protected onSubmit(){
    console.log('Form submitted');
    this.formGroup.reset(initialFormState);
  }
}
