import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxMaskIonicModule } from '../ngx-mask-ionic.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestMaskComponent } from './utils/test-component.component';
import { equal } from './utils/test-functions.component';

describe('Directive: Mask', () => {
  let fixture: ComponentFixture<TestMaskComponent>;
  let component: TestMaskComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestMaskComponent],
      imports: [ReactiveFormsModule, NgxMaskIonicModule.forRoot()]
    });
    fixture = TestBed.createComponent(TestMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('repeat mask', () => {
    component.mask = '0{4}';
    equal('1234', '1234', fixture);
  });

  it('should work when repeat value is more then 9', () => {
    component.mask = 'A{12}';
    equal('123456789ABC', '123456789ABC', fixture);
  });

  it('should correctly handle leading zeros', () => {
    component.mask = 'A{02}';
    equal('1234', '12', fixture);

    component.mask = 'A{0000012}';
    equal('123456789ABCDE', '123456789ABC', fixture);
  });

  it('should repeat digits only', () => {
    component.mask = '0{6}';
    equal('AbC12345678Bfc', '123456', fixture);
  });

  it('should repeat digits and letters', () => {
    component.mask = 'A{6}';
    equal('AbC12345678Bfc', 'AbC123', fixture);
  });

  it('should repeat only letters', () => {
    component.mask = 'S{6}';
    equal('AbC12345678Bfc', 'AbCBfc', fixture);
  });

  it('repeat mask date', () => {
    component.mask = '0{2}/0{2}/0{4}';
    equal('12345678', '12/34/5678', fixture);
  });

  it('specialCharacters quotes', () => {
    component.mask = "'00'00'0000'";
    equal('12345678', "'12'34'5678'", fixture);
  });
});
