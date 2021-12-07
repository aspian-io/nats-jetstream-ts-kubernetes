import { connect, JSONCodec } from 'nats';
import { TaxonomyCreatedPublisher } from './events/taxonomy-created-publisher';
import { TaxonomyCreatedTestPublisher } from './events/taxonomy-created-test-publisher';

console.clear();

// create a codec
const jc = JSONCodec();

connect( { servers: 'http://localhost:4222', name: 'adrian' } )
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
      console.log( 'first', err )
    }

    const publisher2 = new TaxonomyCreatedTestPublisher( nc );
    try {
      await publisher2.publish( {
        type: 'CATEGORY-TEST',
        description: '',
        term: "cat 1 test",
        slug: 'cat-1-test'
      } );
    } catch ( err ) {
      console.log( 'last', err )
    }
  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );