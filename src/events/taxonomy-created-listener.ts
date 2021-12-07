import { JsMsg } from "nats";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TaxonomyCreatedEvent } from "./taxonomy-created-event";

export class TaxonomyCreatedListener extends Listener<TaxonomyCreatedEvent> {
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
  queueGroupName = 'taxonomy-service';
  onMessage ( data: TaxonomyCreatedEvent[ 'data' ], msg: JsMsg ) {
    console.log( `Event Data #${ msg.seq } - `, data );
    msg.ack();
  }
}