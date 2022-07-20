import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHopitalComponent } from './v-hopital.component';

describe('VHopitalComponent', () => {
  let component: VHopitalComponent;
  let fixture: ComponentFixture<VHopitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VHopitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VHopitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
