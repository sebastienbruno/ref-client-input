import { Component, EnvironmentInjector, forwardRef, inject, Injector, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RefClient } from '../ref-client.model';
import { NumericInputDirective } from '../numeric-input.directive';
import { combineLatest, filter, map, startWith, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-ref-client-input-form-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumericInputDirective,
    JsonPipe,
  ],
  templateUrl: './ref-client-input-form-control.component.html',
  styleUrls: ['./ref-client-input-form-control.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RefClientInputFormControlComponent)}
  ]
})
export class RefClientInputFormControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  ngControl!: NgControl;
  subscription = new Subscription();


  // A creuser pour injecter le NgControl
  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, { self: true });
    this.subscription.add(combineLatest([
      this.form.controls.emetIden.valueChanges.pipe(
        map(inputValue => Number.isNaN(Number.parseInt(inputValue)) ? '' : Number.parseInt(inputValue).toString()),
      ),
      this.form.controls.actiIden.valueChanges.pipe(
        map(inputValue => Number.isNaN(Number.parseInt(inputValue)) ? '' : Number.parseInt(inputValue).toString()),
      ),  
    ]).pipe(
      tap(([emetIden, actiIden]) => this.onChange({emetIden, actiIden})),
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected form: FormGroup<{emetIden: FormControl<string>, actiIden: FormControl<string>}> = this.formBuilder.group({
    emetIden: [''],
    actiIden: [''],
  });

  protected onChange: (value: RefClient) => void = () => {};
  protected onTouch: () => void = () => {};

  writeValue(value: RefClient): void {
    this.form.patchValue(value);
  }

  registerOnChange(fn: (value: RefClient) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

}
