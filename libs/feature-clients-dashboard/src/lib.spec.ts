import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDashboard } from './lib';

describe('ClientDashboard', () => {
  let component: ClientDashboard;
  let fixture: ComponentFixture<ClientDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
