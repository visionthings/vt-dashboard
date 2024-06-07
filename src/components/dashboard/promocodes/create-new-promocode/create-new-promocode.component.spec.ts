import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPromocodeComponent } from './create-new-promocode.component';

describe('CreateNewPromocodeComponent', () => {
  let component: CreateNewPromocodeComponent;
  let fixture: ComponentFixture<CreateNewPromocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPromocodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
