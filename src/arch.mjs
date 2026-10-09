// Target architecture for the AI Enterprise Knowledge Platform (from the product brief).
// This is a design, not a claim that every component exists. See aiStatus in site.mjs.
export const arch = {
  ingestion: {
    label: 'Ingestion path',
    steps: [
      { t: 'Upload UI', s: 'to NestJS API', d: 'A user uploads a document. The API receives the request and creates a document record in a visible state.', x: 'Showing upload, queued, processing, indexed and failed states is more honest than implying instant ingestion.' },
      { t: 'Validate', s: 'and authorise', d: 'The API validates the request and checks the tenant permissions of the user.', x: 'Tenant isolation is enforced server-side on every relevant path. UI filters alone are not security.' },
      { t: 'Store and queue', s: 'S3 + SQS (target)', d: 'The original file goes to object storage, separate from metadata. An ingestion job is placed on a queue.', x: 'Async ingestion keeps upload requests short. The cost is queue visibility, retries, idempotency and eventual consistency.' },
      { t: 'Worker', s: 'extract, normalise, chunk', d: 'A worker extracts text, cleans it and splits it into chunks with source metadata.', x: 'Chunk size and overlap affect precision, context size and cost. They should be chosen by experiment, not by guesswork.' },
      { t: 'Embed and index', s: 'PostgreSQL + pgvector', d: 'An embedding provider turns chunks into vectors. Chunks, vectors and metadata are stored together.', x: 'PostgreSQL with pgvector keeps relational data and vectors close. Retrieval quality and scale should be evaluated before adding a separate vector database.' },
      { t: 'Status and logs', s: 'searchable or failed', d: 'The document becomes searchable. Failures produce an observable failed state and a retry strategy where appropriate.', x: 'Operational clarity matters: failures, retries and limits should be understandable to users and operators.' },
    ],
  },
  qa: {
    label: 'Question-answering path',
    steps: [
      { t: 'Question', s: 'from the user', d: 'The user asks a question in the workspace.', x: 'The interface needs clear loading, empty, no-results and error states.' },
      { t: 'Scoped retrieval', s: 'tenant-aware', d: 'The API validates identity and tenant scope, then retrieves relevant chunks within the permitted knowledge base.', x: 'Hybrid lexical and semantic retrieval may help with exact identifiers. It is an experiment, not a finished feature.' },
      { t: 'Context assembly', s: 'with source metadata', d: 'The application assembles a bounded context that keeps each chunk linked to its source.', x: 'Bounded context controls cost and keeps answers inspectable.' },
      { t: 'Grounded answer', s: 'LLM + context', d: 'An LLM generates an answer grounded in the retrieved context only.', x: 'Redis would only be added for a defined caching need with safe invalidation.' },
      { t: 'Answer and citations', s: 'or insufficient evidence', d: 'The response returns citations that map to real retrieved chunks. If evidence is weak, the product says so instead of forcing an answer.', x: 'Citations must never be decorative. Each one points to a retrieved chunk the user can open.' },
    ],
  },
};
