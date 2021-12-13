import { JSONCodec, NatsConnection } from 'nats';
import { addStream } from './helpers/add-stream';
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

    try {
      // check if stream is existed
      await jsm.streams.info( this.stream );
    } catch ( err: any ) {
      if ( err.code === '404' ) {
        // stream not found so we add it
        await addStream( jsm, this.stream );
      } else {
        console.log( 'Problem getting stream info' );
      }
    }

    const jetStreamClient = this.natsConnection.jetstream();

    try {
      await jetStreamClient.publish( this.subject, jc.encode( data ) );
      console.log( `${ this.stream } service publishes event to subject: ${ this.subject }` );

    } catch ( reason: any ) {
      console.error( reason );
    }
  }
}