import { connect } from 'nats';
import { TaxonomyCreatedListener } from './events/taxonomy-created-listener';
import { TaxonomyUpdatedListener } from './events/taxonomy-updated-listener';

console.clear();

connect( { servers: 'http://localhost:4222', name: 'test' } )
  .then( async ( nc ) => {
    console.log( `listener connected to ${ nc.getServer() }` );

    // Durable Listening for create publisher
    await new TaxonomyCreatedListener( nc ).listen();
    // Durable Listening for update publisher
    await new TaxonomyUpdatedListener( nc ).listen();

  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );