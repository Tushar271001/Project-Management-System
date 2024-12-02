import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewComponent } from './createnew.component';

describe('CreatenewComponent', () => {
  let component: CreatenewComponent;
  let fixture: ComponentFixture<CreatenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatenewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
