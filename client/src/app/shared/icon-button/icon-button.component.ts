import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon-button',
	template: `
    <button [ngStyle]="{'width': size, 'height': size}">
      <mat-icon  [ngStyle]="{'width': size, 'height': size, 'font-size': size, 'border-width': borderWidth}">{{icon}}</mat-icon>
    </button>
  `,
	styles: [
		`
	button {
	  	background-color: transparent;
	  	cursor: pointer;
	  	outline: none;
		
	  }
	mat-icon {
		border-style: solid;
		border-color: black;
		border-radius: 50%;
	}`
	]
})
export class IconButtonComponent {
	constructor() {}

	@Input() icon: string;
	@Input() size: string;
	@Input() borderWidth: string;
}
