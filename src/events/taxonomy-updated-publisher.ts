import { Publisher } from "./base-publisher";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TaxonomyUpdatedEvent } from "./taxonomy-updated-event";

export class TaxonomyUpdatedPublisher extends Publisher<TaxonomyUpdatedEvent> {
  stream: Streams = Streams.Taxonomy;
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
}