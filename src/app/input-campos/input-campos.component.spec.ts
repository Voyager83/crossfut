import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCamposComponent } from './input-campos.component';

describe('InputCamposComponent', () => {
  let component: InputCamposComponent;
  let fixture: ComponentFixture<InputCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCamposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
