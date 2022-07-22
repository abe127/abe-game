import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfIntroduceComponent } from './self-introduce.component';

describe('SelfIntroduceComponent', () => {
  let component: SelfIntroduceComponent;
  let fixture: ComponentFixture<SelfIntroduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfIntroduceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
