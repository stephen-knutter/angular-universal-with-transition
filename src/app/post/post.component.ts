import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common/src/platform_id';

const RESULT_KEY = makeStateKey<string>('result');

@Component({
  selector: 'app-post',
  template: `<p>Post</p>`
})
export class PostComponent implements OnInit {
  private isServer: boolean;
  private result;

  constructor(
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformid) {
      this.isServer = isPlatformServer(platformid);
  }

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      // We are in the browser
      this.result = this.tstate.get(RESULT_KEY, '');
    } else {
      // No result received (browser)
      this.result = 'Im created in the browser.';
    }

    this.tstate.onSerialize(RESULT_KEY, () => {
      // On the server
      return 'Im created on the server.';
    });
  }
}
