import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSolutionComponent } from './quiz-solution.component';

describe('QuizSolutionComponent', () => {
  let component: QuizSolutionComponent;
  let fixture: ComponentFixture<QuizSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
