import { Publisher } from "./base-publisher";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TestUpdatedEvent } from "./test-updated-event";

export class TestUpdatedPublisher extends Publisher<TestUpdatedEvent> {
  stream: Streams.Test = Streams.Test;
  subject: Subjects.TestUpdated = Subjects.TestUpdated;
}