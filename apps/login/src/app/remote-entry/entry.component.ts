import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@ng-mf/data-access-user';
import { TranslocoDirective } from '@ngneat/transloco';
import { LibWithTranslocoComponent } from '@ng-mf/lib-with-transloco';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoDirective, LibWithTranslocoComponent],
  selector: 'ng-mf-login-entry',
  template: `
    <div class="login-app">
      <lib-lib-with-transloco/>
      <ng-container *transloco="let t;scope: 'loginScope'">
        <p>{{ t('loginScope.login') }}</p>
      </ng-container>

      <form class="login-form" (ngSubmit)="login()">
        <label>
          Username:
          <input type="text" name="username" [(ngModel)]="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" [(ngModel)]="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <div *ngIf="isLoggedIn$ | async">User is logged in!</div>
    </div>
  `,
  styles: [
    `
      .login-app {
        width: 30vw;
        border: 2px dashed black;
        padding: 8px;
        margin: 0 auto;
      }
      .login-form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 8px;
      }
      label {
        display: block;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService) {}

  login() {
    this.userService.checkCredentials(this.username, this.password);
  }
}
