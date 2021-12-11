import { JsMsg } from "nats";
import { Listener } from "./base-listener";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TestCreatedEvent } from "./test-created-event";

export class TestCreatedListener extends Listener<TestCreatedEvent> {
  stream: Streams.Test = Streams.Test;
  subject: Subjects.TestCreated = Subjects.TestCreated;
  onMessage ( data: TestCreatedEvent[ 'data' ], msg: JsMsg ) {
    console.log( `Event Data #${ msg.seq } - `, data );
    msg.ack();
  }
}