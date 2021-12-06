import { Streams } from "./streams";
import { Subjects } from "./subjects";

export interface TaxonomyCreatedEvent {
  stream: Streams.Taxonomy;
  subject: Subjects.TaxonomyCreated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}