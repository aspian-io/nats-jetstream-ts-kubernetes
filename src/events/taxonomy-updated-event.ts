import { Subjects } from "./subjects";

export interface TaxonomyUpdatedEvent {
  subject: Subjects.TaxonomyUpdated;
  data: {
    type: string;
    description: string;
    term: string;
    slug: string;
  }
}