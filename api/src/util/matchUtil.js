export function extractMatchedUsers(matches, userId) {
  for (const match of matches) {
    extractMatchedUser(match, userId);
  }
}

export function extractMatchedUser(match, userId) {
  for (let index = 0; index < match.participants.length; index++) {
    const participant = match.participants[index];
    if (userId !== participant.userId) {
      match.matchedUser = participant.user;
    }
  }
}
