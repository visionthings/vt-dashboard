import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenVisitRequestsComponent } from './open-visit-requests.component';

describe('OpenVisitRequestsComponent', () => {
  let component: OpenVisitRequestsComponent;
  let fixture: ComponentFixture<OpenVisitRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenVisitRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenVisitRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
