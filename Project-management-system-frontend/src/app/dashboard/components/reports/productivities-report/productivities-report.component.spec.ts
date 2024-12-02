import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivitiesReportComponent } from './productivities-report.component';

describe('ProductivitiesReportComponent', () => {
  let component: ProductivitiesReportComponent;
  let fixture: ComponentFixture<ProductivitiesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductivitiesReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductivitiesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
