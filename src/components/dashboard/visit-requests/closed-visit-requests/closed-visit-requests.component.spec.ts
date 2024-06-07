import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedVisitRequestsComponent } from './closed-visit-requests.component';

describe('ClosedVisitRequestsComponent', () => {
  let component: ClosedVisitRequestsComponent;
  let fixture: ComponentFixture<ClosedVisitRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedVisitRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClosedVisitRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
