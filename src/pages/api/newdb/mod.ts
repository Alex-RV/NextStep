type UserId = string;

interface DatabaseEntry {
  name: string;
  interests: string[];
  goals: string;
}

interface Database {
  entries: Map<UserId, DatabaseEntry>;
}

var db: Database = {
  entries: new Map(),
};

export { db, type DatabaseEntry, type UserId };
