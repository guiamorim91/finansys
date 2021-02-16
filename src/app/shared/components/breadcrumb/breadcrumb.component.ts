import { Component, Input, OnInit } from '@angular/core';

interface BreadcrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() itens: Array<BreadcrumbItem> = [];

  constructor() { }

  ngOnInit() {
  }

  isTheLastItem(item: BreadcrumbItem): boolean {
    const index = this.itens.indexOf(item);
    return (index + 1) == this.itens.length;
  }

}
