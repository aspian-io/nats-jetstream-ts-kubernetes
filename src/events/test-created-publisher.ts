import { Publisher } from "./base-publisher";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TestCreatedEvent } from "./test-created-event";

export class TestCreatedPublisher extends Publisher<TestCreatedEvent> {
  stream: Streams.Test = Streams.Test;
  subject: Subjects.TestCreated = Subjects.TestCreated;
}