import { consumerOpts, JsMsg, JSONCodec, NatsConnection } from 'nats';
import { Streams } from './streams';
import { Subjects } from "./subjects";

interface Event {
  stream: Streams;
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract stream: T[ 'stream' ];
  abstract subject: T[ 'subject' ];
  abstract queueGroupName: string;
  abstract onMessage ( data: T[ 'data' ], msg: JsMsg ): void;
  private natsConnection: NatsConnection;
  protected ackWait = 5 * 1000;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  consumerOptions () {
    const durableName = `q-${ this.queueGroupName }-sub-${ this.subject.replace( '.', '-' ) }-durable`;
    const jc = JSONCodec<T[ 'data' ]>();

    const opts = consumerOpts();
    opts.queue( this.queueGroupName );
    opts.deliverAll();
    opts.deliverTo( durableName );
    opts.deliverGroup( this.queueGroupName )
    opts.durable( durableName );
    opts.manualAck();
    opts.ackExplicit();
    opts.ackWait( this.ackWait );
    opts.callback( ( _err, msg ) => {
      if ( msg ) {
        console.log( `Message received: ${ msg.subject } / ${ msg.info.stream }` );
        // console.log( `Event Data #${ msg.seq } - `, jc.decode( msg.data ) );
        this.onMessage( jc.decode( msg.data ), msg );
      }
    } );

    return opts;
  }

  async listen () {
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
      await jetStreamClient.subscribe(
        this.subject,
        this.consumerOptions()
      );
    } catch ( err ) {
      console.error( err );
    }
  }
}