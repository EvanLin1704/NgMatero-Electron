import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ThemeModule } from "@theme/theme.module";
import { RoutesModule } from "./routes/routes.module";
import { FormlyConfigModule } from "./formly-config.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { ToastrModule } from "ngx-toastr";

import { APP_CONFIG } from "@env/environment";
import { BASE_URL, httpInterceptorProviders, appInitializerProviders } from "@core";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemDataService } from "@shared/in-mem/in-mem-data.service";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, "./assets/i18n/", ".json");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ThemeModule,
    RoutesModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    })
  ],
  providers: [{ provide: BASE_URL, useValue: APP_CONFIG.baseUrl }, httpInterceptorProviders, appInitializerProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
