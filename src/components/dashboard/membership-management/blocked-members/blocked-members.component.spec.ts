import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedMembersComponent } from './blocked-members.component';

describe('BlockedMembersComponent', () => {
  let component: BlockedMembersComponent;
  let fixture: ComponentFixture<BlockedMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockedMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
