import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductArr } from './product-arr';

describe('ProductArr', () => {
  let component: ProductArr;
  let fixture: ComponentFixture<ProductArr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductArr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductArr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
