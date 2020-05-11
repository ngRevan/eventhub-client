import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [MatMomentDateModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
