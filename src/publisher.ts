import { connect, JSONCodec } from 'nats';
import { TestCreatedPublisher } from './events/test-created-publisher';
import { TestUpdatedPublisher } from './events/test-updated-publisher';

console.clear();

// create a codec
const jc = JSONCodec();

connect( { servers: 'http://localhost:4222', name: 'test' } )
  .then( async ( nc ) => {
    console.log( `publisher connected to ${ nc.getServer() }` );

    //First Publish for test
    const createPublisher = new TestCreatedPublisher( nc );
    try {
      await createPublisher.publish( {
        type: 'CATEGORY',
        description: '',
        term: "cat 1",
        slug: 'cat-1'
      } );
    } catch ( err ) {
      console.log( 'first', err )
    }

    // // Second Publish for test
    const updatePublisher = new TestUpdatedPublisher( nc );
    try {
      await updatePublisher.publish( {
        type: 'CATEGORY-UPDATED',
        description: '',
        term: "cat 1 updated",
        slug: 'cat-1-updated'
      } );
    } catch ( err ) {
      console.log( 'last', err )
    }

  } )
  .catch( err => {
    console.log( `error connecting to NATS server: `, err );
  } );