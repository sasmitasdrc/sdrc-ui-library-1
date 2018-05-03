import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref =>{
  //Ensure angular destroys itself on not reloads
  if(window['ngRef']){
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;
// otherwise log the boot error
}).catch(err => console.log(err));
