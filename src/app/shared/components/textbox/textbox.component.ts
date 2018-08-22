import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR,
  NG_VALIDATORS, ControlValueAccessor, Validator
} from '@angular/forms';
@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    }

  ]
})
export class TextboxComponent implements OnInit, ControlValueAccessor, Validator {

  /** function template */
  private onTouchedCallback: () => {};

  /** available patterns */
  private regex = [
    { type: 'email', pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    { type: 'phone', pattern: '^\\d+$' }
  ];

  /** hold the regex pattern */
  public patternValue: any;

  /** for hold the inner value for the input */
  private innerValue: string;

  /** to differentiate between to actions 'onblur' or 'whileWriting' */
  public validationMode = '';

  /** pre define actions */
  public validationModeObj = {
    onblur: 'onblur',
    whileWriting: 'whileWriting'
  };

  /** element id attribute*/
  @Input() id: string;

  /** element name attribute */
  @Input() name: string;

  /** element placeholder attribute */
  @Input() placeholder: string;

  /** the lable for the input */
  @Input() label = '';

  /** for check if the input is required or not  */
  @Input() required = false;

  /** to specify the maximum characters for the input  */
  @Input() maxLength = 200;

  /** to disable the input or not */
  @Input() disabled = false;

  /** required errot message */
  @Input() requiredErrorMessage: string;

  /** this variable will hold key name from regex-config.json file */
  @Input() patternKey: string = null;

  /** pattern errot message */
  @Input() patternErrorMessage: string;

  @Output() Keyup = new EventEmitter<any>();

  /** function template */
  private validateFn: any = () => { };

  /** function template */
  private onChangeCallback = (_: any) => { };

  /** get accessor including */
  get value(): any {
    return this.innerValue;
  }

  /** set accessor including call the onChange callback */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  ngOnInit() {
    if (this.patternKey) {
      const regex = this.regex.find(r => r.type === this.patternKey);
      this.patternValue = (regex) ? regex.pattern : null;
    }

    this.validateFn = this.createTextBoxValidator();
  }

  /**
  * this function form implementing Validator
  * to validate the input based on our criteria
  * @param c
  */
  validate(c: AbstractControl): ValidationErrors {
    return this.validateFn(c);
  }
  /**
  * this function form implementing ControlValueAccessor
  * responsible for Writes a new value to the element.
  * @param obj
  */
  writeValue(obj: any): void {
    this.innerValue = obj;
  }
  /**
  * this function form implementing ControlValueAccessor
  * @param fn
  */
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  /**
   * this function form implementing ControlValueAccessor
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  /**
 * custom validation for inputs
 */
  createTextBoxValidator() {
    return (c: FormControl) => {
      const patt = new RegExp(this.patternValue);
      if (patt && this.required) {
        return (c.value && patt.test(c.value)) ? null : { mismatch: true };
      } else if (patt && c.value) {
        return (patt.test(c.value)) ? null : { mismatch: true };
      } else {
        return null;
      }
    };
  }


  /**
   * on unfoucs from input
   */
  onBlur() {
    this.onTouchedCallback();
    this.onChangeCallback(this.innerValue);
    this.validationMode = this.validationModeObj.onblur;
  }

  /**
   * fire when key up
   * @param param0 to get the value from target
   */
  onKey({target}) {
    this.Keyup.emit(target.value);
  }


}
