import { messaging } from 'firebase-admin'

export class Something {
  constructor(
  	public messaging: messaging.Messaging
  ) {
  }
}
