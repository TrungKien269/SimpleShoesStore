import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateshoesComponent } from './createshoes.component';

describe('CreateshoesComponent', () => {
  let component: CreateshoesComponent;
  let fixture: ComponentFixture<CreateshoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateshoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateshoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
