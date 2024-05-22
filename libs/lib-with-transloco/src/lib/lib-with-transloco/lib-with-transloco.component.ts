import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoDirective } from '@ngneat/transloco';

export const loader = ['en', 'de'].reduce((acc, lang) => {
  // @ts-ignore
  acc[lang] = () => import(`../i18n/${lang}.json`);
  return acc;
}, {});


@Component({
  selector: 'lib-lib-with-transloco',
  standalone: true,
  imports: [CommonModule,TranslocoDirective],
  providers:[ provideTranslocoScope({
    scope: 'libScope',
    loader,
  } )],
  templateUrl: './lib-with-transloco.component.html',
  styleUrl: './lib-with-transloco.component.css',


})
export class LibWithTranslocoComponent implements OnInit{
  ngOnInit() {
    console.log('created')
  }
}
