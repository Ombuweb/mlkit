import { Observable, EventData, Page, Dialogs, ImageSource } from '@nativescript/core';
import { DemoSharedMlkitCore } from '@demo/shared';
import { DetectionType, MLKitView, DetectionEvent, detectWithStillImage } from '@nativescript/mlkit-core';
import { BarcodeResult } from '@nativescript/mlkit-barcode-scanning';
import { FaceResult } from '@nativescript/mlkit-face-detection';
import { ImageLabelingResult } from '@nativescript/mlkit-image-labeling';
import { ObjectResult } from '@nativescript/mlkit-object-detection';
import { PoseResult } from '@nativescript/mlkit-pose-detection';
import { TextResult } from '@nativescript/mlkit-text-recognition';
export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedMlkitCore {
	camera: MLKitView;
	detectorType = "all";
	isPaused = false;
	onLoaded(args) {
		this.camera = args.object;
	}

	onDetection(event: DetectionEvent) {
		console.log('onDetection', event.data, event.type);
	}

	toggleCamera() {
		this.camera.toggleCamera();
	}

	requestPermission() {
		this.camera.requestCameraPermission();
	}

	changeType(args) {
		Dialogs.action('Change Detector Type', 'Cancel', [
			'all',
			'barcode',
			'digitalInk (unsupport atm)',
			'face',
			'image',
			'object',
			'pose',
			'text',
			'none'
		]).then(value => {
			if (value === 'Cancel') { return }
			if (value.indexOf('digitalInk') > -1) {
				Dialogs.alert('digitalInk is currently unsupported')
				this.set('detectorType', 'none');
			} else {
				this.set('detectorType', value);
			}
		})
	}

	togglePause(args) {
		this.camera.pause = !this.camera.pause;
		this.set('isPaused', this.camera.pause);
	}

	async processStill(args) {
		try {
			const src = await ImageSource.fromUrl('https://www.jqueryscript.net/images/jQuery-Plugin-To-Generate-International-Article-Number-Barcode-EAN13.jpg');
			
			console.log(src.android)
			const result = await detectWithStillImage(src, {
				detectorType: DetectionType.Barcode
			});
			console.log('processStill', result.barcode[0]);
		} catch (e) {
			console.log(e);
		}
	}
}

