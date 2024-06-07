import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMailComponent } from './create-new-mail.component';

describe('CreateNewMailComponent', () => {
  let component: CreateNewMailComponent;
  let fixture: ComponentFixture<CreateNewMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
