import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToTeam } from './add-member-to-team';

describe('AddMemberToTeam', () => {
  let component: AddMemberToTeam;
  let fixture: ComponentFixture<AddMemberToTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMemberToTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberToTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
