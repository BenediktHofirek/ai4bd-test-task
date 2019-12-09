import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pageId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageId = this.route.snapshot.params['pageId'];
  }

}
