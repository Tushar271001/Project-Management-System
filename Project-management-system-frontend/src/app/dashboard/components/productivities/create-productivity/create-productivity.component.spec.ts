import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductivityComponent } from './create-productivity.component';

describe('CreateProductivityComponent', () => {
  let component: CreateProductivityComponent;
  let fixture: ComponentFixture<CreateProductivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
