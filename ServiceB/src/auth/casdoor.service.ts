import { Injectable } from '@nestjs/common';
import { SDK } from 'casdoor-nodejs-sdk';

@Injectable()
export class CasdoorService {
  private sdk: SDK;

  constructor() {
    this.sdk = new SDK({
      endpoint: 'http://localhost:8000',
      clientId: '0fb9d0398c59eb5daff1',
      clientSecret: 'e0a08fbb623a592c1355cb3e8fa5318454583362',
      certificate: 'YOUR_CERTIFICATE',
      orgName: 'built-in',
    });
  }

  getLoginUrl() {
    return this.sdk.getSignInUrl('http://localhost:3000/auth/callback');
  }

  async handleCallback(code: string) {
    return this.sdk.getAuthToken(code);
  }
}
