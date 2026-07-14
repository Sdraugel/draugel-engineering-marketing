import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// Angular 22 requires the server bootstrap to forward the BootstrapContext to
// bootstrapApplication; omitting it fails route extraction with NG0401.
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
