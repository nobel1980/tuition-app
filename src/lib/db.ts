import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'mock-db.json');

export async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function writeDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function login(email: string, password: string) {
  await delay(500);
  const db = await readDB();
  const user = db.users.find((u: any) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  // Remove password from user object before returning
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserById(id: string) {
  await delay(200);
  const db = await readDB();
  const user = db.users.find((u: any) => u.id === id);
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getStudentByUserId(userId: string) {
  await delay(300);
  const db = await readDB();
  return db.students.find((s: any) => s.userId === userId) || null;
}

export async function getTeacherByUserId(userId: string) {
  await delay(300);
  const db = await readDB();
  return db.teachers.find((t: any) => t.userId === userId) || null;
}

export async function getAllStudents() {
  await delay(300);
  const db = await readDB();
  return db.students;
}

export async function getAllTeachers() {
  await delay(300);
  const db = await readDB();
  return db.teachers;
}

export async function getAllUsers() {
  await delay(300);
  const db = await readDB();
  return db.users.map(({ password, ...u }: any) => u);
}

export async function getStats() {
  await delay(200);
  const db = await readDB();
  return db.stats;
}

export async function getClasses() {
  await delay(200);
  const db = await readDB();
  return db.classes;
}

// --- CRUD Operations ---

export async function createUser(userData: any) {
  const db = await readDB();
  const id = 'u' + Date.now();
  const newUser = { id, ...userData };
  db.users.push(newUser);
  await writeDB(db);
  return newUser;
}

export async function updateUser(id: string, userData: any) {
  const db = await readDB();
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...userData };
    await writeDB(db);
    return db.users[index];
  }
  return null;
}

export async function deleteUser(id: string) {
  const db = await readDB();
  db.users = db.users.filter((u: any) => u.id !== id);
  await writeDB(db);
}

export async function createStudent(studentData: any) {
  const db = await readDB();
  const id = 's' + Date.now();
  const newStudent = { id, ...studentData };
  db.students.push(newStudent);
  await writeDB(db);
  return newStudent;
}

export async function updateStudent(id: string, studentData: any) {
  const db = await readDB();
  const index = db.students.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    db.students[index] = { ...db.students[index], ...studentData };
    await writeDB(db);
    return db.students[index];
  }
  return null;
}

export async function deleteStudent(id: string) {
  const db = await readDB();
  db.students = db.students.filter((s: any) => s.id !== id);
  await writeDB(db);
}

export async function createClass(classData: any) {
  const db = await readDB();
  const id = 'c' + Date.now();
  const newClass = { id, ...classData };
  db.classes.push(newClass);
  await writeDB(db);
  return newClass;
}

export async function updateClass(id: string, classData: any) {
  const db = await readDB();
  const index = db.classes.findIndex((c: any) => c.id === id);
  if (index !== -1) {
    db.classes[index] = { ...db.classes[index], ...classData };
    await writeDB(db);
    return db.classes[index];
  }
  return null;
}

export async function deleteClass(id: string) {
  const db = await readDB();
  db.classes = db.classes.filter((c: any) => c.id !== id);
  await writeDB(db);
}

export async function updateTeacher(id: string, teacherData: any) {
  const db = await readDB();
  const index = db.teachers.findIndex((t: any) => t.id === id);
  if (index !== -1) {
    db.teachers[index] = { ...db.teachers[index], ...teacherData };
    await writeDB(db);
    return db.teachers[index];
  }
  return null;
}
