import initialDb from "@/data/mock-db.json";

const STORAGE_KEY = "ibt_mock_db";

function getDB() {
    if (typeof window === "undefined") return initialDb;
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDb));
        return initialDb;
    }
    return JSON.parse(data);
}

function saveDB(db: any) {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }
}

// Simulate latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(email: string, password: string) {
    await delay(300);
    const db = getDB();
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function getUserById(id: string) {
    await delay(100);
    const db = getDB();
    const user = db.users.find((u: any) => u.id === id);
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function getStudentByUserId(userId: string) {
    await delay(100);
    const db = getDB();
    return db.students.find((s: any) => s.userId === userId) || null;
}

export async function getTeacherByUserId(userId: string) {
    await delay(100);
    const db = getDB();
    return db.teachers.find((t: any) => t.userId === userId) || null;
}

export async function getAllStudents() {
    await delay(100);
    const db = getDB();
    return db.students;
}

export async function getAllTeachers() {
    await delay(100);
    const db = getDB();
    return db.teachers;
}

export async function getAllUsers() {
    await delay(100);
    const db = getDB();
    return db.users.map(({ password, ...u }: any) => u);
}

export async function getStats() {
    await delay(100);
    const db = getDB();
    return db.stats;
}

export async function getClasses() {
    await delay(100);
    const db = getDB();
    return db.classes;
}

// --- CRUD Operations ---

export async function createUser(userData: any) {
    const db = getDB();
    const id = "u" + Date.now();
    const newUser = { id, ...userData };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
}

export async function updateUser(id: string, userData: any) {
    const db = getDB();
    const index = db.users.findIndex((u: any) => u.id === id);
    if (index !== -1) {
        db.users[index] = { ...db.users[index], ...userData };
        saveDB(db);
        return db.users[index];
    }
    return null;
}

export async function deleteUser(id: string) {
    const db = getDB();
    db.users = db.users.filter((u: any) => u.id !== id);
    saveDB(db);
}

export async function createStudent(studentData: any) {
    const db = getDB();
    const id = "s" + Date.now();
    const newStudent = { id, ...studentData };
    db.students.push(newStudent);
    saveDB(db);
    return newStudent;
}

export async function updateStudent(id: string, studentData: any) {
    const db = getDB();
    const index = db.students.findIndex((s: any) => s.id === id);
    if (index !== -1) {
        db.students[index] = { ...db.students[index], ...studentData };
        saveDB(db);
        return db.students[index];
    }
    return null;
}

export async function deleteStudent(id: string) {
    const db = getDB();
    db.students = db.students.filter((s: any) => s.id !== id);
    saveDB(db);
}

export async function createClass(classData: any) {
    const db = getDB();
    const id = "c" + Date.now();
    const newClass = { id, ...classData };
    db.classes.push(newClass);
    saveDB(db);
    return newClass;
}

export async function updateClass(id: string, classData: any) {
    const db = getDB();
    const index = db.classes.findIndex((c: any) => c.id === id);
    if (index !== -1) {
        db.classes[index] = { ...db.classes[index], ...classData };
        saveDB(db);
        return db.classes[index];
    }
    return null;
}

export async function deleteClass(id: string) {
    const db = getDB();
    db.classes = db.classes.filter((c: any) => c.id !== id);
    saveDB(db);
}

export async function updateTeacher(id: string, teacherData: any) {
    const db = getDB();
    const index = db.teachers.findIndex((t: any) => t.id === id);
    if (index !== -1) {
        db.teachers[index] = { ...db.teachers[index], ...teacherData };
        saveDB(db);
        return db.teachers[index];
    }
    return null;
}
