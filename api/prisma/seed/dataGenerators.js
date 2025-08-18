import { faker } from '@faker-js/faker';
import { getRandomNumber } from './helpers.js';
import { USTimezone, MentorshipStyle } from '@prisma/client';

export function generateUserFromSlackData(slackMember) {
  // Extract name and email from Slack data, fallback to faker if not available
  const realName =
    slackMember?.real_name ||
    slackMember?.profile?.real_name ||
    faker.person.fullName();
  const email =
    slackMember?.profile?.email ||
    faker.internet.email(realName.split(' ')[0], realName.split(' ')[1]);

  return {
    name: realName,
    email: email,
    age: getRandomNumber(22, 65), // Random age between 22-65
    slackID: slackMember?.id || faker.datatype.uuid(),
    slackName: slackMember?.name || faker.internet.userName(),
    slackObj: slackMember || {},
  };
}

export async function enrichUserData(user) {
  const role = faker.person.jobTitle();
  const department = faker.commerce.department();
  const level = faker.person.jobType();
  const timezone = faker.helpers.arrayElement(Object.values(USTimezone));
  const isLookingForMentorship = faker.datatype.boolean();
  const isOpenToMentoring = faker.datatype.boolean();
  const networkingGoals = faker.helpers.arrayElements(
    ['make friends', 'build connections', 'get advice'],
    faker.number.int({ min: 1, max: 3 })
  );
  const interests = faker.lorem.words(3);
  const goals = faker.lorem.sentence();
  const values = faker.lorem.words(2);
  const careerPersonalGoals = faker.lorem.sentence();
  const skillDevelopmentAreas = faker.lorem.words(3);
  const motivators = faker.lorem.words(2);
  const desiredStyle = faker.helpers.arrayElement(
    Object.values(MentorshipStyle)
  );
  const skills = faker.lorem.words(3);
  const areasForExposure = faker.lorem.words(3);
  const dealBreakers = faker.lorem.words(2);

  return {
    ...user,
    role,
    department,
    level,
    timezone,
    isLookingForMentorship,
    isOpenToMentoring,
    networkingGoals,
    interests,
    goals,
    values,
    careerPersonalGoals,
    skillDevelopmentAreas,
    motivators,
    desiredStyle,
    skills,
    areasForExposure,
    dealBreakers,
  };
}

export async function generateUsers(slackData, count = 500) {
  const users = [];
  let slackMemberIndex = 0;

  for (let i = 0; i < count; i++) {
    const slackMember =
      slackData.members[slackMemberIndex % slackData.members.length];
    slackMemberIndex++;
    const slackUser = generateUserFromSlackData(slackMember);
    const enrichedUser = await enrichUserData(slackUser);
    users.push(enrichedUser);
  }

  return users;
}
