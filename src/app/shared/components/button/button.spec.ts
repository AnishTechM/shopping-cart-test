import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked when clicked and not disabled', () => {
    spyOn(component.clicked, 'emit');
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    btn.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should NOT emit clicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    spyOn(component.clicked, 'emit');

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should apply the disabled attribute to the native button', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
  });

  it('should default to type="button" and variant "filled"', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.type).toBe('button');
    expect(btn.className).toContain('btn--filled');
  });

  it('should apply the submit type when set', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.type).toBe('submit');
  });
});
