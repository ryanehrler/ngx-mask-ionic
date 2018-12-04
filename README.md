<a href="">
  <h1 align="center">ngx-mask-Ionic</h1>
  <h3>This is a fork of ngx-mask@7.0.1 - adapted to work with Ionic (Tested with Ionic V3)</h3>
<a/>

##### ngx-mask

<a href="https://jsdaddy.github.io/ngx-mask/">Library Here</a>

##### Disclaimer

Unlike the original ngx-mask library the unmasked value will not be mapped to your form or bound value. Unfortunately Ionic syncs the value of the html input with the form - so there is no way (at least I could find) to track the values seperately. To put it another way - ngx-mask sets input.value to the masked value and form.value to the unmasked value, which isn't possible with Ionic since it syncs these two values.

## Installing

```bash
$ npm install --save ngx-mask-ionic
```

## Quickstart

Import **ngx-mask-ionic** module in Angular app.

```typescript
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

(...)

@NgModule({
  (...)
  imports: [
    NgxMaskIonicModule.forRoot(options)
    // Or no options and use default values
    NgxMaskIonicModule.forRoot()

    // ^^^ Chose one of the two options above, but not both.
  ]
  (...)
})

```

... And in your page Module (eg. HomeModule, MyPageModule, ..)

```typescript
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

(...)

@NgModule({
  (...)
  imports: [
    NgxMaskIonicModule
  ]
  (...)
})
```

Then, just define masks in inputs.

#### Usage

```html
<ion-input
  formControlName="phoneNumber"
  mask="(000) 000-0000"
  type="text"
  maxlength="14"
></ion-input>

<ion-input
  formControlName="email"
  mask="A*@A*.S*"
  [dropSpecialCharacters]="false"
  type="text"
></ion-input>
```

Also you can use mask pipe

#### Usage

```html
<span>{{phone | mask: '(000) 000-0000'}}</span>
```

#### Examples

| mask           | example        |
| -------------- | -------------- |
| 9999-99-99     | 2017-04-15     |
| 0\*.00         | 2017.22        |
| 000.000.000-99 | 048.457.987-98 |
| AAAA           | 0F6g           |
| SSSS           | asDF           |

## Mask Options

You can define your custom options for all directives (as object in the mask module) or for each (as attributes for directive)

### specialCharacters (string[ ])

We have next default characters:

| character |
| --------- |
| /         |
| (         |
| )         |
| .         |
| :         |
| -         |
| **space** |
| +         |
| ,         |
| @         |

##### Usage

```html
<ion-input
  type="text"
  specialCharacters="[ '[' ,']' , '\' ]"
  mask="[00]\[000]"
></ion-input>
```

##### Then:

```
Input value: 789-874.98
Masked value: [78]\[987]
```

### patterns ({ [character: string]: { pattern: RegExp, optional?: boolean})

We have next default patterns:

| code  | meaning                                     |
| ----- | ------------------------------------------- |
| **0** | digits (like 0 to 9 numbers)                |
| **9** | digits (like 0 to 9 numbers), but optional  |
| **A** | letters (uppercase or lowercase) and digits |
| **S** | only letters (uppercase or lowercase)       |

##### Usage:

```html
<ion-input type="text" [patterns]="customPatterns" mask="(000-000)"></ion-input>
```

and in your component

```typescript
public customPatterns = {'0': { pattern: new RegExp('\[a-zA-Z\]')}};
```

##### Then:

```
Input value: 789HelloWorld
Masked value: (Hel-loW)
```

### prefix (string)

You can add prefix to you masked value

##### Usage

```html
<ion-input type="text" prefix="+7 " mask="(000) 000 00 00"></ion-input>
```

### sufix (string)

You can add sufix to you masked value

##### Usage

```html
<ion-input type="text" sufix=" $" mask="0000"></ion-input>
```

### dropSpecialCharacters (boolean)

You can choose if mask will drop special character in the model, or not, default value true

##### Usage

```html
<ion-input
  type="text"
  [dropSpecialCharacters]="false"
  mask="000-000.00"
></ion-input>
```

##### Then:

```
Input value: 789-874.98
Model value: 789-874.98
```

### showMaskTyped (boolean)

You can choose if mask is shown while typing, or not, default value false

##### Usage

```html
<ion-input mask="(000) 000-0000" prefix="+7" [showMaskTyped]="true"></ion-input>
```

### clearIfNotMatch (boolean)

You can choose clear the input if the input value **not match** the mask, default value false

### Pipe with mask expression and custom Pattern ([string, pattern])

You can pass array of expression and custom Pattern to pipe

##### Usage

```html
<span>{{phone | mask: customMaska}}</span>
```

and in your component

```
customMaska: [string, pattern];

pattern =  {
    'P': {
        pattern: new RegExp('\\d'),
    }};

this.customMaska = ['PPP-PPP', this.pattern];
```

### Repeat mask

You can pass into mask pattern with brackets

##### Usage

```html
<ion-input type="text" mask="A{4}"></ion-input>
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.
