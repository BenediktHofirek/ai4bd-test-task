import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-popup-form',
	templateUrl: './popup-form.component.html',
	styleUrls: [ './popup-form.component.css' ]
})
export class PopupFormComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: {
			formFields: [{ type: string; label: string; options: { rows?: number; cols?: number } }];
			saveButtonText: string;
		}
	) {}
}
