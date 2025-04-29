import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysicComponent } from './analysic.component';

describe('AnalysicComponent', () => {
  let component: AnalysicComponent;
  let fixture: ComponentFixture<AnalysicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
