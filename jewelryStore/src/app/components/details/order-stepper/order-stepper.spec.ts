import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStepper } from './order-stepper';

describe('OrderStepper', () => {
  let component: OrderStepper;
  let fixture: ComponentFixture<OrderStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStepper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
