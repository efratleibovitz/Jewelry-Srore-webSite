import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemArr } from './category-item-arr';

describe('CategoryItemArr', () => {
  let component: CategoryItemArr;
  let fixture: ComponentFixture<CategoryItemArr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryItemArr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryItemArr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
