import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUrgenceComponent } from './my-urgence.component';

describe('MyUrgenceComponent', () => {
  let component: MyUrgenceComponent;
  let fixture: ComponentFixture<MyUrgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyUrgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUrgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
