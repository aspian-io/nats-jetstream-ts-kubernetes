import { JSONCodec, NatsConnection } from 'nats';
import { Streams } from './streams';
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract stream: Streams;
  abstract subject: T[ 'subject' ];
  private natsConnection: NatsConnection;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  async publish ( data: T[ 'data' ] ): Promise<void> {
    // create a codec
    const jc = JSONCodec();
    const jsm = await this.natsConnection.jetstreamManager();

    try {
      // check if stream is existed
      await jsm.streams.info( this.stream );
    } catch ( err ) {
      // stream not found so we add it
      await jsm.streams.add( { name: this.stream, subjects: [ `${ this.stream }.*` ] } );
    }

    const jetStreamClient = this.natsConnection.jetstream();

    try {
      await jetStreamClient.publish( this.subject, jc.encode( data ) );
      console.log( 'Event published to subject', this.subject, this.stream );

    } catch ( reason: any ) {
      console.error( reason );
    }
  }
}