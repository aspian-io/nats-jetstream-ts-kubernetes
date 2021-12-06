import { JSONCodec, NatsConnection } from 'nats';
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T[ 'subject' ];
  private natsConnection: NatsConnection;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  async publish ( data: T[ 'data' ] ): Promise<void> {
    // create a codec
    const jc = JSONCodec();
    const jetStreamClient = this.natsConnection.jetstream();

    try {
      const pub = await jetStreamClient.publish( this.subject, jc.encode( data ) );
      console.log( 'Event published to subject', this.subject );
    } catch ( reason: any ) {
      throw new Error( reason );
    }
  }
}