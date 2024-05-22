import { Route } from '@angular/router';
import { provideTranslocoScope } from '@ngneat/transloco';


export const loader = ['en', 'de'].reduce((acc, lang) => {
  // @ts-ignore
  acc[lang] = () => import(`../../assets/i18n/${lang}.json`);
  return acc;
}, {});

/*export const loader = ['en', 'de'].reduce((acc, lang) => {
  // @ts-ignore
  acc[lang] = () => import(`../../../../../libs/lib-with-transloco/src/lib/i18n/${lang}.json`);
  return acc;
}, {});*/

export const remoteRoutes: Route[] = [
  { path: '', loadComponent: ()=>import('./entry.component').then(c=>c.RemoteEntryComponent) ,providers: [
      provideTranslocoScope({
        scope: 'loginScope',
        loader,
      } ),
    /*  provideTranslocoScope({
        scope: 'libScope',
        loader,
      } )*/
    ] },
];
