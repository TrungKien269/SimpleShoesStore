import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateshoesComponent } from './updateshoes.component';

describe('UpdateshoesComponent', () => {
  let component: UpdateshoesComponent;
  let fixture: ComponentFixture<UpdateshoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateshoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateshoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
