import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostCommentComponent } from './cost-comment.component';


describe('CostCommentComponent', () => {
  let component: CostCommentComponent;
  let fixture: ComponentFixture<CostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostCommentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
