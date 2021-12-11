import { Streams } from "./streams";
import { Subjects } from "./subjects";

export interface TestCreatedEvent {
  stream: Streams.Test;
  subject: Subjects.TestCreated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}