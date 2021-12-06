import { JSONCodec, NatsConnection } from 'nats';
import { Streams } from './streams';
import { Subjects } from "./subjects";

interface Event {
  stream: Streams;
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract stream: T[ 'stream' ];
  abstract subject: T[ 'subject' ];
  private natsConnection: NatsConnection;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  async publish ( data: T[ 'data' ] ): Promise<void> {
    // create a codec
    const jc = JSONCodec();
    const jsm = await this.natsConnection.jetstreamManager();
    await jsm.streams.add( { name: this.stream.toLowerCase(), subjects: [ this.subject.toLowerCase() ] } );
    const jetStreamClient = this.natsConnection.jetstream();

    try {
      const pub = await jetStreamClient.publish( this.subject, jc.encode( data ) );
      console.log( 'Event published to subject', this.subject );
    } catch ( reason: any ) {
      throw new Error( reason );
    }
  }
}