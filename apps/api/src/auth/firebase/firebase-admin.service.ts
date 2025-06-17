// src/auth/firebase/firebase-admin.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private defaultApp: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      this.defaultApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      this.defaultApp = admin.app();
    }
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.defaultApp.auth().verifyIdToken(idToken);
  }
}
