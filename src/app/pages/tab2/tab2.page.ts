import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor( private postsService: PostsService,
               private route: Router,
               private geolocation: Geolocation,
               private camera: Camera ) {}

  async crearPost() {

    console.log(this.post);
    await this.postsService.craerPost( this.post );

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl( '/main/tabs/tab1' );

  }

  getGeo() {

    if ( !this.post.posicion ) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((res) => {

      this.cargandoGeo = false;

      const coords = `${ res.coords.latitude },${ res.coords.longitude }`;

      this.post.coords = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });

    console.log(this.post);
  }

  camara() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );

  }

  libreria() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  }

  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture( options ).then( ( imageData ) => {

      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log(img);

      this.postsService.subirImagen( imageData );
      this.tempImages.push( img );

     }, (err) => {
      // Handle error
     });

  }

}
