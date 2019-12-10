import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		Material.MatCardModule,
		Material.MatIconModule,
		Material.MatListModule,
		Material.MatButtonModule,
		Material.MatButtonToggleModule
	],
	exports: [
		Material.MatCardModule,
		Material.MatIconModule,
		Material.MatListModule,
		Material.MatButtonModule,
		Material.MatButtonToggleModule
	]
})
export class MaterialModule {}
