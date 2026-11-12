import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.scss',
  standalone: false,
})
export class ParentComponent {

  userForm!: FormGroup;

  name = 'varun';
  message = '';

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
  ) {

    ngZone.run(() => {
      console.log('This code is running inside Angular zone');
    });

    this.userForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      setInterval(() => {
        location.reload();
      }, 5000);

    } else {
      alert('Form is invalid. Please check the fields and try again.');
    }
  }

  recevieMessage(value: string) {
    this.message = value;
  }
}
