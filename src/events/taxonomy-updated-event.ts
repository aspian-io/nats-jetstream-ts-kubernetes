import { Streams } from "./streams";
import { Subjects } from "./subjects";

export interface TaxonomyUpdatedEvent {
  stream: Streams.Taxonomy;
  subject: Subjects.TaxonomyUpdated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}