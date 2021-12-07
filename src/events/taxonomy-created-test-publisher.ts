import { Publisher } from "./base-publisher";
import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { TaxonomyCreatedTestEvent } from "./taxonomy-created-test-event";

export class TaxonomyCreatedTestPublisher extends Publisher<TaxonomyCreatedTestEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyCreatedTest = Subjects.TaxonomyCreatedTest;
}