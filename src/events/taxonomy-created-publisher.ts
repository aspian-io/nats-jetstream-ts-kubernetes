import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TaxonomyCreatedEvent } from "./taxonomy-created-event";

export class TaxonomyCreatedPublisher extends Publisher<TaxonomyCreatedEvent> {
  subject = Subjects.TaxonomyCreated;
}