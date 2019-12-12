import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: [ './filter.component.css' ]
})
export class FilterComponent {
	constructor() {}
	@Input() label: string;
	@Output() filterChangeEvent = new EventEmitter<string>();

	handleFilter(filter: string): void {
		this.filterChangeEvent.emit(filter);
	}
}
