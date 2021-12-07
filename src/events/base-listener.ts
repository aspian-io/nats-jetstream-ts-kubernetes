import { consumerOpts, createInbox, JsMsg, JSONCodec, NatsConnection } from 'nats';
import { Streams } from './streams';
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract stream: Streams;
  abstract subject: T[ 'subject' ];
  abstract onMessage ( data: T[ 'data' ], msg: JsMsg ): void;
  private natsConnection: NatsConnection;
  protected ackWait = 5 * 1000;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  consumerOptions () {
    const durableName = `str-${ this.stream }-sub-${ this.subject.replace( '.', '-' ) }-durable`;

    const opts = consumerOpts();
    opts.deliverAll();
    opts.deliverTo( createInbox( this.stream ) );
    opts.queue( this.stream );
    opts.durable( durableName );
    opts.ackWait( this.ackWait );
    opts.manualAck();
    opts.ackExplicit();

    return opts;
  }

  async listen () {
    const jsm = await this.natsConnection.jetstreamManager();

    try {
      // check if stream is existed
      await jsm.streams.info( this.stream );
    } catch ( err ) {
      // stream not found so we add it
      await jsm.streams.add( { name: this.stream, subjects: [ `*.>` ] } );
    }

    const jetStreamClient = this.natsConnection.jetstream();
    try {
      const subscription = await jetStreamClient.subscribe(
        this.subject,
        this.consumerOptions()
      );

      ( async () => {
        for await ( const msg of subscription ) {
          console.log( `Message received: ${ this.subject } / ${ this.stream }` );
          const jc = JSONCodec<T[ 'data' ]>();
          const parsedData = jc.decode( msg.data );
          this.onMessage( parsedData, msg );
        }
      } )();

    } catch ( err ) {
      console.error( err );
    }
  }
}