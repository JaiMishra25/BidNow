import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputesComponent } from './disputes.component';

describe('DisputesComponent', () => {
  let component: DisputesComponent;
  let fixture: ComponentFixture<DisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisputesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
