import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../../services/mail.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-email',
  standalone: true,
  imports: [
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-email.component.html',
  styleUrl: './contact-email.component.scss',
})
export class ContactEmailComponent implements OnInit {
  constructor(private mailService: MailService, private fb: FormBuilder) {}

  form = this.fb.group({
    email: ['', Validators.required],
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  submit() {
    this.mailService.setContactMail(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'تم إضافة البريد الإلكتروني بنجاح.';
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: () => {
        this.errorMessage =
          'تعذر إضافة البريد الإلكتروني في الوقت الحالي،يرجى إعادة المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      },
    });
  }

  ngOnInit(): void {
    this.mailService.getContactMail().subscribe({
      next: (res) => {
        this.form.patchValue(res);
      },
    });
  }
}
