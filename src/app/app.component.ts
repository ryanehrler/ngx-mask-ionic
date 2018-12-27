import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  normalInputValue: string;
  wrappedInputValue: string;
  firstLastInputValue: string;

  masks = {
    phoneNumber: '(000) 000-0000',
    email: 'A*@A*.S*',
    firstLast: {
      mask: '0* 0*',
      pattern: { '0': { pattern: /[a-zA-Z']/ } }
    }
  };
}
