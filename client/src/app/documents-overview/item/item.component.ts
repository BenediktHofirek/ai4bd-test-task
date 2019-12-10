import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	@Input() title: string;
	@Output() linkClickEvent = new EventEmitter<void>();

	handleLinkClick():void{
		this.linkClickEvent.emit();
	}
}
