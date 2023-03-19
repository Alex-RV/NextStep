type UserId = string;

interface UserPair {
  mentee: UserId;
  mentour: UserId;
}

interface ChatRecords {
  sender: UserId;
  text: String;
}

interface UserData {
  data: Map<UserPair, ChatRecords[]>;
}

var users: UserData = {
  data: new Map(),
};

export { users, type UserId, type UserPair };
