import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingroupsComponent } from './admingroups.component';

describe('AdmingroupsComponent', () => {
  let component: AdmingroupsComponent;
  let fixture: ComponentFixture<AdmingroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmingroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmingroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
