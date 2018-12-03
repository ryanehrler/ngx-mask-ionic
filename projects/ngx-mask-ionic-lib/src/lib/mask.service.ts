import { ElementRef, Inject, Injectable, Renderer2 } from '@angular/core';
import { config, IConfig } from './config';
import { DOCUMENT } from '@angular/common';
import { MaskApplierService } from './mask-applier.service';
import { NgControl } from '@angular/forms';

@Injectable()
export class MaskService extends MaskApplierService {
  public maskExpression = '';
  public isNumberValue = false;
  public showMaskTyped = false;
  public maskIsShown = '';
  private _formElement: HTMLInputElement;
  private unmaskedValue: string | number;
  public onTouch = () => {};
  public constructor(
    // tslint:disable-next-line
    @Inject(DOCUMENT) private document: any,
    @Inject(config) protected _config: IConfig,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _ngControl: NgControl
  ) {
    super(_config);
    this.setFormElement(_elementRef.nativeElement);

    setTimeout(() => {
      if (this._formElement.localName !== 'input') {
        const inputEl = this._elementRef.nativeElement.querySelector('input');
        if (inputEl != null) {
          this.setFormElement(inputEl);
        } else {
          console.warn(
            'mask-service: Could not find Input Element.  Please make sure one is present.'
          );
        }
      }

      this._ngControl.valueChanges.subscribe((value: string) => {
        this._onControlValueChange(value);
      });
    });
  }

  public setFormElement(el: HTMLInputElement) {
    this._formElement = el;
  }

  public applyMask(
    inputValue: string,
    maskExpression: string,
    position: number = 0,
    cb: Function = () => {}
  ): string {
    this.maskIsShown = this.showMaskTyped
      ? this.maskExpression.replace(/[0-9]/g, '_')
      : '';
    if (!inputValue && this.showMaskTyped) {
      return this.prefix + this.maskIsShown;
    }

    const result = super.applyMask(inputValue, maskExpression, position, cb);
    this.unmaskedValue = this.getUnmaskedValue(result);

    return this._applyMaskResult(result);
  }

  public applyValueChanges(
    position: number = 0,
    cb: Function = () => {}
  ): void {
    const maskedInput: string | number = this.applyMask(
      this._formElement.value,
      this.maskExpression,
      position,
      cb
    );
    this._formElement.value = maskedInput;
    if (this._formElement === this.document.activeElement) {
      return;
    }
    this.clearIfNotMatchFn();
  }

  public showMaskInInput(): void {
    if (this.showMaskTyped) {
      this.maskIsShown = this.maskExpression.replace(/[0-9]/g, '_');
    }
  }

  public clearIfNotMatchFn(): void {
    console.log('clear-if-not-matched');
    if (
      this.clearIfNotMatch === true &&
      this.maskExpression.length !== this._formElement.value.length
    ) {
      this.setValue('');
      this.applyMask(this._formElement.value, this.maskExpression);
    }
  }

  public setValue(value: string) {
    this.unmaskedValue = this.getUnmaskedValue(value);
    this._ngControl.control.setValue(value);
  }
  public setFormElementProperty(name: string, value: string | boolean) {
    if (this._formElement) {
      this._renderer.setProperty(this._formElement, name, value);
    }
  }

  public getUnmaskedValue(result: string): string | number {
    const resultNoSuffixOrPrefix = this._removeSufix(
      this._removePrefix(result)
    );
    let changeValue: string | number = resultNoSuffixOrPrefix;

    if (Array.isArray(this.dropSpecialCharacters)) {
      changeValue = this._removeMask(
        resultNoSuffixOrPrefix,
        this.dropSpecialCharacters
      );
    } else if (this.dropSpecialCharacters) {
      changeValue = this._removeMask(
        resultNoSuffixOrPrefix,
        this.maskSpecialCharacters
      );
      changeValue = this.isNumberValue ? Number(changeValue) : changeValue;
    }

    return changeValue;
  }

  private _removeMask(
    value: string,
    specialCharactersForRemove: string[]
  ): string {
    return value
      ? value.replace(this._regExpForRemove(specialCharactersForRemove), '')
      : value;
  }

  private _removePrefix(value: string): string {
    if (!this.prefix) {
      return value;
    }
    return value ? value.replace(this.prefix, '') : value;
  }

  private _removeSufix(value: string): string {
    if (!this.sufix) {
      return value;
    }
    return value ? value.replace(this.sufix, '') : value;
  }

  private _regExpForRemove(specialCharactersForRemove: string[]): RegExp {
    return new RegExp(
      specialCharactersForRemove.map((item: string) => `\\${item}`).join('|'),
      'gi'
    );
  }

  private _applyMaskResult(result: string) {
    if (!this.showMaskTyped) {
      return result;
    }
    const resLen: number = result.length;
    const prefNmask: string = this.prefix + this.maskIsShown;
    const ifMaskIsShown = prefNmask.slice(resLen);

    return result + ifMaskIsShown;
  }

  private _onControlValueChange(value: string) {
    /*
      Because we are no longer working with the ControlValueAccessor (since it doesn't play nice with Ionic).
      We need logic here to track changes made programmatically to the form value.  Specifically changes
      done OUTSIDE of the mask. Since changes done inside the mask may also fire off this method
      we need to do some jiu jitsu to ensure we are ignoring those changes.
    */
    const newValue = this.getUnmaskedValue(value);

    if (this.unmaskedValue === newValue) {
      return;
    }

    let unmaskedSubstring: string = null;

    // This method (value change) fires off before a Keydown or Input event, so we need to subtract
    // the latest change and compare to our previous (known) value.
    if (this.unmaskedValue != null) {
      const v = this.unmaskedValue.toString();
      unmaskedSubstring = v.substring(0, v.length - 1);
    }

    if (newValue !== unmaskedSubstring) {
      const nv = newValue != null ? newValue.toString() : null;
      const v = this.applyMask(nv, this.maskExpression);
      this.setValue(v);
    }
  }
}
