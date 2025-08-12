import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RefClientInputNgModelComponent } from '../ref-client-input-ng-model/ref-client-input-ng-model.component';
import { NumericInputDirective } from '../numeric-input.directive';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RefClient } from '../ref-client.model';
import { CustomValidators } from '../custom-validators';
import { RefClientInputFormControlComponent } from '../ref-client-input-form-control/ref-client-input-form-control.component';

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
  selector: 'app-parent',
  standalone: true,
  imports: [
    CommonModule,
    RefClientInputNgModelComponent, RefClientInputFormControlComponent,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly formGroupNgModel: FormGroup<FormModel> = this.formBuilder.group({
    simpleInput: ['', Validators.required],
    refClient: [{emetIden: '', actiIden: ''}, CustomValidators.refClientRequired],
  })

  protected onSubmitFormGroupNgModel(){
    console.log('Form submitted');
    this.formGroupNgModel.reset(initialFormState);
  }

  protected readonly formGroupFormControl: FormGroup<FormModel> = this.formBuilder.group({
    simpleInput: ['', Validators.required],
    refClient: [{emetIden: '', actiIden: ''}, CustomValidators.refClientRequired],
  })

  protected onSubmitFormGroupFormControl(){
    console.log('Form submitted');
    this.formGroupFormControl.reset(initialFormState);
  }

}
