import { Streams } from "./streams";
import { Subjects } from "./subjects";

export interface TaxonomyCreatedTestEvent {
  stream: Streams.Taxonomy;
  subject: Subjects.TaxonomyCreatedTest;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}