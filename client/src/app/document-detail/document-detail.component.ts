import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  docId: number;
  pageId: number;
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.docId = this.route.snapshot.params['docId'];
    this.pageId = this.route.snapshot.params['pageId'] || null;
  }
}
