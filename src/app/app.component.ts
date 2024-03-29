import { AfterViewInit, Component } from "@angular/core";
import { ElectronService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { APP_CONFIG } from "../environments/environment";
import { PreloaderService } from "@core";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements AfterViewInit {
  constructor(private electronService: ElectronService, private translate: TranslateService, private preloader: PreloaderService) {
    this.translate.setDefaultLang("zh-TW");
    console.log("APP_CONFIG", APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log("Run in electron");
      console.log("Electron ipcRenderer", this.electronService.ipcRenderer);
      console.log("NodeJS childProcess", this.electronService.childProcess);
    } else {
      console.log("Run in browser");
    }
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
