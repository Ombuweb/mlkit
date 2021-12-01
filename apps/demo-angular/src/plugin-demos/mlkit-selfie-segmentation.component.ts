import { Component, NgZone } from '@angular/core';
import { DemoSharedMlkitSelfieSegmentation } from '@demo/shared';
import { } from '@nativescript/mlkit-selfie-segmentation';

@Component({
	selector: 'demo-mlkit-selfie-segmentation',
	templateUrl: 'mlkit-selfie-segmentation.component.html',
})
export class MlkitSelfieSegmentationComponent {
  
  demoShared: DemoSharedMlkitSelfieSegmentation;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedMlkitSelfieSegmentation();
  }

}