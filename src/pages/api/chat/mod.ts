type UserId = string;

interface UserPair {
  mentee: UserId;
  mentour: UserId;
}

interface ChatRecord {
  sender: UserId;
  text: String;
}

interface UserData {
  data: Map<UserPair, ChatRecord[]>;
}

var users: UserData = {
  data: new Map(),
};

export { users, type UserId, type UserPair, type ChatRecord };
