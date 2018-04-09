import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "zone.js/dist/zone";

/**
 * This is the main entry point for the applications. It's only job is to 'Bootstrap' our home module
 */
platformBrowserDynamic().bootstrapModule(AppModule);
