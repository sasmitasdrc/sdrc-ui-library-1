import { Component, AfterViewInit, AfterViewChecked } from '@angular/core';
declare var $:any;

@Component({
  selector: 'sdrc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  
  ngAfterViewChecked(){
    $(window).scroll(function() {
      if($(window).scrollTop() > 170){
        $("#header").addClass("header-sec-fixed");
        $(".left-list").addClass('left-side-scroll');
      }
      else{
        $("#header").removeClass("header-sec-fixed");
        $(".left-list").removeClass('left-side-scroll');
      }
    })
  }
}
