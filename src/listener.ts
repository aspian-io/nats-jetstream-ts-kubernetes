import { connect } from 'nats';
import { TaxonomyCreatedListener } from './events/taxonomy-created-listener';

console.clear();

connect( { servers: 'http://localhost:4222', name: 'adrian' } )
  .then( async ( nc ) => {
    console.log( `listener connected to ${ nc.getServer() }` );

    await new TaxonomyCreatedListener( nc ).listen();
  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );