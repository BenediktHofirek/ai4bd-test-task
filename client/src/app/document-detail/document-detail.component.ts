import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  docId: number;
  pageNumbers: number[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.docId = this.route.snapshot.params['docId'];
    this.pageNumbers = [1,2,3];
  }
}
