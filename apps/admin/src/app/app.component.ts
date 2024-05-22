import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@ng-mf/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';
import { LibWithTranslocoComponent } from '@ng-mf/lib-with-transloco';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LibWithTranslocoComponent, TranslocoDirective],
  selector: 'ng-mf-root',
  template: `
    <div class="dashboard-nav">Admin Dashboard</div>
    <button type="button" (click)="changeLanguage('en')">English</button>
    <button type="button" (click)="changeLanguage('de')">Deutsch</button>
    <ng-container *transloco="let t">
      <p>{{ t('home') }}</p>
    </ng-container>
    <div *ngIf="isLoggedIn$ | async; else signIn">
      You are authenticated so you can see this content.
    </div>
    <ng-template #signIn><router-outlet></router-outlet></ng-template>
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;



  constructor(private userService: UserService, private router: Router,private translocoService: TranslocoService) {}

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }

  public changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
