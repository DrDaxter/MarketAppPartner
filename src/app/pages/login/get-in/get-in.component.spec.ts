import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInComponent } from './get-in.component';

describe('GetInComponent', () => {
  let component: GetInComponent;
  let fixture: ComponentFixture<GetInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
