import { consumerOpts, createInbox, JsMsg, JSONCodec, NatsConnection } from 'nats';
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T[ 'subject' ];
  abstract queueGroupName: string;
  abstract onMessage ( data: T[ 'data' ], msg: JsMsg ): void;
  private natsConnection: NatsConnection;
  protected ackWait = 5 * 1000;

  constructor ( natsConnection: NatsConnection ) {
    this.natsConnection = natsConnection;
  }

  consumerOptions () {
    const opts = consumerOpts();
    opts.deliverAll();
    opts.deliverTo( createInbox( this.queueGroupName ) );
    opts.queue( this.queueGroupName );
    opts.durable( this.queueGroupName );
    opts.ackWait( this.ackWait );
    opts.manualAck();
    opts.ackExplicit();
    return opts;
  }

  async listen () {
    const jetStreamClient = this.natsConnection.jetstream();
    const subscription = await jetStreamClient.subscribe(
      this.subject,
      this.consumerOptions()
    );

    subscription

    const done = ( async () => {
      for await ( const msg of subscription ) {
        console.log( `Message received: ${ this.subject } / ${ this.queueGroupName }` );
        const jc = JSONCodec<T[ 'data' ]>();
        const parsedData = jc.decode( msg.data );
        this.onMessage( parsedData, msg );
      }
    } )();
  }
}