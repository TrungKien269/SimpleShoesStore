import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshoesComponent } from './editshoes.component';

describe('EditshoesComponent', () => {
  let component: EditshoesComponent;
  let fixture: ComponentFixture<EditshoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
