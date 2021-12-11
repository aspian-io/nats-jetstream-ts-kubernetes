import { JsMsg } from "nats";
import { Listener } from "./base-listener";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TestCreatedEvent } from "./test-created-event";
import { TestUpdatedEvent } from "./test-updated-event";

export class TestUpdatedListener extends Listener<TestUpdatedEvent> {
  stream: Streams.Test = Streams.Test;
  subject: Subjects.TestUpdated = Subjects.TestUpdated;
  queueGroupName = 'post-service';
  onMessage ( data: TestCreatedEvent[ 'data' ], msg: JsMsg ) {
    console.log( `Event Data #${ msg.seq } - `, data );
    msg.ack();
  }
}