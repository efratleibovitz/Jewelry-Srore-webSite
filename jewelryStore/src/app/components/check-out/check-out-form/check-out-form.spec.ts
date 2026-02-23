import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutForm } from './check-out-form';

describe('CheckOutForm', () => {
  let component: CheckOutForm;
  let fixture: ComponentFixture<CheckOutForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
