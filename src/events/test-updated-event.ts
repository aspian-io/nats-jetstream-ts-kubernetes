import { Streams } from "./streams";
import { Subjects } from "./subjects";

export interface TestUpdatedEvent {
  stream: Streams.Test;
  subject: Subjects.TestUpdated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}