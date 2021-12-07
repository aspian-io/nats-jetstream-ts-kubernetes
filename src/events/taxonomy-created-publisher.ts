import { Publisher } from "./base-publisher";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TaxonomyCreatedEvent } from "./taxonomy-created-event";

export class TaxonomyCreatedPublisher extends Publisher<TaxonomyCreatedEvent> {
  stream: Streams = Streams.Taxonomy;
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
}