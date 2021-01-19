import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private media: Media) { }

  ionViewWillEnter() {
    this.test()

  }

  test() {
    // Create a Media instance.  Expects path to file or url as argument
    // We can optionally pass a second argument to track the status of the media

    const patch = '/assets/test.mp3';
    const file: MediaObject = this.media.create(patch);

    // to listen to plugin events:

    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

    file.onSuccess.subscribe(() => console.log('Action is successful'));

    file.onError.subscribe(error => console.log('Error!', error));

    // play the file
    file.play();

    // pause the file
    file.pause();

    // get current playback position
    file.getCurrentPosition().then((position) => {
      console.log(position);
    });

    // get file duration
    let duration = file.getDuration();
    console.log(duration);

    // skip to 10 seconds (expects int value in ms)
    file.seekTo(10000);

    // stop playing the file
    file.stop();

    // release the native audio resource
    // Platform Quirks:
    // iOS simply create a new instance and the old one will be overwritten
    // Android you must call release() to destroy instances of media when you are done
    file.release();

  }
}
