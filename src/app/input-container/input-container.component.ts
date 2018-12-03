import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input-container",
  templateUrl: "./input-container.component.html",
  styleUrls: ["./input-container.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputContainerComponent),
      multi: true
    }
  ]
})
export class InputContainerComponent implements ControlValueAccessor {
  private innerValue: any = "";
  private onChangeCallback: (_: any) => void;
  private onTouchedCallback: () => void;

  get value(): any {
    return this.innerValue;
  }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  constructor() {}

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
