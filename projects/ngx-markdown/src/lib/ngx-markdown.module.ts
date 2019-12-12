import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { MarkdownComponent } from './ngx-markdown.component';
import { LanguagePipe } from './language.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './ngx-markdown.service';
import { MarkedOptions } from './marked-options';

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  markedOptions?: Provider;
}

export const initialMarkedOptions: Provider = {
  provide: MarkedOptions,
  useValue: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  }
};

@NgModule({
  declarations: [MarkdownComponent, LanguagePipe, MarkdownPipe],
  exports: [MarkdownComponent, LanguagePipe, MarkdownPipe]
})
export class MarkdownModule {
  static forRoot(
    markdownModuleConfig?: MarkdownModuleConfig
  ): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        (markdownModuleConfig && markdownModuleConfig.loader) || [],
        (markdownModuleConfig && markdownModuleConfig.markedOptions) ||
          initialMarkedOptions
      ]
    };
  }

  static forChild(): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule
    };
  }
}
