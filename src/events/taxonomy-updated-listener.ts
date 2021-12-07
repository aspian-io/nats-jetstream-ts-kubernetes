import { JsMsg } from "nats";
import { Listener } from "./base-listener";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TaxonomyCreatedEvent } from "./taxonomy-created-event";
import { TaxonomyUpdatedEvent } from "./taxonomy-updated-event";

export class TaxonomyUpdatedListener extends Listener<TaxonomyUpdatedEvent> {
  stream: Streams = Streams.Post;
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
  queueGroupName = 'post-service';
  onMessage ( data: TaxonomyCreatedEvent[ 'data' ], msg: JsMsg ) {
    console.log( `Event Data #${ msg.seq } - `, data );
    msg.ack();
  }
}