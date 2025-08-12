import { Component, EnvironmentInjector, forwardRef, inject, Injector, OnInit, SkipSelf } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { RefClient } from '../ref-client.model';
import { NumericInputDirective } from '../numeric-input.directive';

@Component({
  selector: 'app-ref-client-input-ng-model',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NumericInputDirective,
    JsonPipe,
  ],
  templateUrl: './ref-client-input-ng-model.component.html',
  styleUrls: ['./ref-client-input-ng-model.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RefClientInputNgModelComponent)}
  ]
})
export class RefClientInputNgModelComponent implements ControlValueAccessor, OnInit {

  ngControl!: NgControl;

  // A creuser pour injecter le NgControl
  constructor(private injector: Injector) {}
  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, { self: true });
  }

  protected value: RefClient = {
    emetIden: '',
    actiIden: '',
  }

  protected isDisabled = false;
  protected onChange: (value: RefClient) => void = () => {};
  protected onTouch: () => void = () => {};

  protected onActiIdenChange(value: string) {
    // Possibilité de mutualiser le comportement avec onEmetIdenChange
    const parseValue = Number.parseInt(value);
    if (parseValue) {
      this.value.actiIden = parseValue.toString();
      this.onChange({...this.value});
    } else if (!value) {
      this.value.actiIden = '';
      this.onChange({...this.value});
    }
  }

  protected onEmetIdenChange(value: string) {
    // Possibilité de mutualiser le comportement avec onActiIdenChange
    const parseValue = Number.parseInt(value);
    if (parseValue) {
      this.value.emetIden = parseValue.toString();
      this.onChange({...this.value});
    } else if (!value) {
      this.value.emetIden = '';
      this.onChange({...this.value});
    }
  }

  writeValue(value: RefClient): void {
    this.value = value;
  }

  registerOnChange(fn: (value: RefClient) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
