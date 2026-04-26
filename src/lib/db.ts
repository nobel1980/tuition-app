import mockDb from '@/data/mock-db.json';

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function login(email: string, password: string) {
  await delay(500);
  const user = mockDb.users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserById(id: string) {
  await delay(200);
  const user = mockDb.users.find(u => u.id === id);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getStudentByUserId(userId: string) {
  await delay(300);
  return mockDb.students.find(s => s.userId === userId) || null;
}

export async function getTeacherByUserId(userId: string) {
  await delay(300);
  return mockDb.teachers.find(t => t.userId === userId) || null;
}

export async function getAllStudents() {
  await delay(300);
  return mockDb.students;
}

export async function getAllTeachers() {
  await delay(300);
  return mockDb.teachers;
}

export async function getAllUsers() {
  await delay(300);
  return mockDb.users.map(({ password, ...u }) => u);
}

export async function getStats() {
  await delay(200);
  return mockDb.stats;
}
