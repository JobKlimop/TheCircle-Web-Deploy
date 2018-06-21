import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    }).compileComponents();
  }));

  it('should create', () => {
    let fixture = TestBed.createComponent(FooterComponent);
    let component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});