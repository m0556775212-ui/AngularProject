import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addproject } from './add-project';

describe('Addproject', () => {
  let component: Addproject;
  let fixture: ComponentFixture<Addproject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addproject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addproject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
