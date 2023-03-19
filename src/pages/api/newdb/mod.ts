type UserId = string;

enum Interests {
  "Agriculture",
  "Art",
  "Architecture",
  "Biology",
  "Business",
  "Chemistry",
  "Geography",
  "Government",
  "History",
  "Law",
  "Communications",
  "ComputerScience",
  "Economics ",
  "English",
  "Engineering",
  "Finance",
  "Management",
  "Marketing",
  "Mathematics",
  "Physics",
}

interface DatabaseEntry {
  name: string;
  interests: Interests[];
  goals: string;
  pronouns: string;
  phone: string;
  education: string,
  experience: string,
  residence: string,
  birth: string,
}

interface Database {
  entries: Map<UserId, DatabaseEntry>;
}

var db: Database = {
  entries: new Map(),
};

export { db, type DatabaseEntry, type UserId };
