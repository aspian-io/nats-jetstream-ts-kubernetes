import { JetStreamManager } from "nats";

export const addStream = async ( jsm: JetStreamManager, stream: string ): Promise<void> => {
  try {
    await jsm.streams.add( { name: stream, subjects: [ `${ stream }.*` ] } );
  } catch ( error ) {
    console.log( 'Problem adding stream' );
  }
}