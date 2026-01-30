import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tasks } from './tasks';


describe('tasks', () => {
  let component: tasks;
  let fixture: ComponentFixture<tasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [tasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(tasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
