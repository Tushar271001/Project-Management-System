import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminGroupComponent } from './create-admin-group.component';

describe('CreateAdminGroupComponent', () => {
  let component: CreateAdminGroupComponent;
  let fixture: ComponentFixture<CreateAdminGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdminGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
