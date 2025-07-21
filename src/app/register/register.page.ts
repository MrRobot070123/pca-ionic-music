import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: String = '';

  validation_messages = {
    name: [
      {
        type: 'required',
      },
      {
        type: 'name',
        message: 'Por favor escribe nombre y apellido',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'El email es obligatorio',
      },
      {
        type: 'email',
        message: 'Email invalido',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Digita tu contraseña',
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener por lo menos 8 caractéres',
      },
    ],
  };

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          this.nameWithSurnameValidator(), //Valida Nombre + Apellido
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.email, //Valida el correo electronico
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.minLength(8),
        ])
      ),
    });
  }

  ngOnInit() {}

  //Funcion para validar el nombre + apellido para completar el registro en campo nombre
  nameWithSurnameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const parts = value.trim().split(' ');

      if (parts.length < 2) {
        return { nameWithSurname: true };
      }

      return null;
    };
  }
}
