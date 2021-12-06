import { connect, JSONCodec } from 'nats';
import { TaxonomyCreatedPublisher } from './events/taxonomy-created-publisher';

console.clear();

// create a codec
const jc = JSONCodec();

connect( { servers: 'http://localhost:4222' } )
  .then( async ( nc ) => {
    console.log( `publisher connected to ${ nc.getServer() }` );

    const publisher = new TaxonomyCreatedPublisher( nc );
    try {
      await publisher.publish( {
        type: 'CATEGORY',
        description: '',
        term: "cat 1",
        slug: 'cat-1'
      } );
    } catch ( err ) {
      console.log( err )
    }
  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );