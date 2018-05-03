import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { routing } from './static.routing';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ResourceComponent } from './resource/resource.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [HomeComponent, AboutUsComponent, GalleryComponent, ResourceComponent, ContactUsComponent]
})
export class StaticModule { }
