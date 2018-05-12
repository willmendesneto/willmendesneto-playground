import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureToggleProviderComponent } from './willmendesneto-playground-provider.component';
import { FeatureToggleComponent } from './willmendesneto-playground.component';

@NgModule({
  declarations: [
    FeatureToggleProviderComponent,
    FeatureToggleComponent
  ],
  exports: [
    FeatureToggleProviderComponent,
    FeatureToggleComponent
  ],
  imports: [ CommonModule ]
})

export class FeatureToggleModule { }
