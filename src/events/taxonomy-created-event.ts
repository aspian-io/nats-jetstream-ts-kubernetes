import { Subjects } from "./subjects";

export interface TaxonomyCreatedEvent {
  subject: Subjects.TaxonomyCreated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}