import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivitiesComponent } from './productivities.component';

describe('ProductivitiesComponent', () => {
  let component: ProductivitiesComponent;
  let fixture: ComponentFixture<ProductivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
