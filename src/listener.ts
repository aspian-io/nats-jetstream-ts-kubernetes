import { connect } from 'nats';
import { TestCreatedListener } from './events/test-created-listener';
import { TestUpdatedListener } from './events/test-updated-listener';

console.clear();

connect( { servers: 'http://localhost:4222', name: 'test' } )
  .then( async ( nc ) => {
    console.log( `listener connected to ${ nc.getServer() }` );

    // Durable Listening for create publisher
    await new TestCreatedListener( nc ).listen();
    // Durable Listening for update publisher
    await new TestUpdatedListener( nc ).listen();

  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );