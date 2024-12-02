import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTeammemberComponent } from './create-new-teammember.component';

describe('CreateNewTeammemberComponent', () => {
  let component: CreateNewTeammemberComponent;
  let fixture: ComponentFixture<CreateNewTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewTeammemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
