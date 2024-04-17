export type DBData = Record<
  string,
  { data: Uint8Array; createdAt: Date; updatedAt: Date }
>;
