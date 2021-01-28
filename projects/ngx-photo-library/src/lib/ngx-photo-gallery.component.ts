import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'lib-ngx-photo-gallery',
  templateUrl: './ngx-photo-gallery.component.html',
  styleUrls: ['./ngx-photo-gallery.component.css'],
})
export class NgxPhotoGalleryComponent implements OnInit {
  images = ['json'];

  gallery: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.gallery = this.element.nativeElement.children[1];
    this.gallery.querySelectorAll('img').forEach((item) => {
      item.classList.add('byebye');
      if (item.complete) {
        console.log(item.src);
      } else {
        item.addEventListener('load', () => {
          const altura = this.getVal(this.gallery, 'grid-auto-rows');
          const gap = this.getVal(this.gallery, 'grid-row-gap');
          const gitem = item.parentElement.parentElement;

          gitem.style.gridRowEnd =
            'span ' + Math.ceil((this.getHeight(gitem) + gap) / (altura + gap));
          item.classList.remove('byebye');
        });
      }
    });

    window.addEventListener('resize', this.resizeAll);

    this.gallery.querySelectorAll('.gallery-item').forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('full');
      });
    });
  }

  getVal(elem, style) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
  }

  getHeight(item) {
    return item.querySelector('.content').getBoundingClientRect().height;
  }

  resizeAll() {
    const altura = this.getVal(this.gallery, 'grid-auto-rows');
    const gap = this.getVal(this.gallery, 'grid-row-gap');
    this.gallery
      .querySelectorAll('.gallery-item')
      .forEach((item: HTMLElement) => {
        const el = item;
        el.style.gridRowEnd =
          'span ' + Math.ceil((this.getHeight(item) + gap) / (altura + gap));
      });
  }
}
