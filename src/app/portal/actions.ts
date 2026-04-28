'use server';

import { revalidatePath } from 'next/cache';
import { 
  createUser, updateUser, deleteUser,
  createClass, updateClass, deleteClass,
  updateStudent, getStudentByUserId,
  updateTeacher
} from '@/lib/db';

export async function adminAddUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  await createUser({ name, email, password, role });
  revalidatePath('/portal/admin');
}

export async function adminEditUser(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  
  await updateUser(id, { name, email, role });
  revalidatePath('/portal/admin');
}

export async function adminDeleteUser(formData: FormData) {
  const id = formData.get('id') as string;
  await deleteUser(id);
  revalidatePath('/portal/admin');
}

export async function adminAddClass(formData: FormData) {
  const subject = formData.get('subject') as string;
  const teacherId = formData.get('teacherId') as string;
  const time = formData.get('time') as string;
  
  await createClass({ subject, teacherId, students: [], time });
  revalidatePath('/portal/admin');
}

export async function adminDeleteClass(formData: FormData) {
  const id = formData.get('id') as string;
  await deleteClass(id);
  revalidatePath('/portal/admin');
}

export async function adminUpdateFeeStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const feeStatus = formData.get('feeStatus') as string;
  
  await updateStudent(id, { feeStatus });
  revalidatePath('/portal/admin');
}

export async function teacherUpdateAttendance(studentId: string, attendance: boolean) {
  await updateStudent(studentId, { lastAttendance: attendance });
  revalidatePath('/portal/teacher');
}

export async function teacherSaveNotes(studentId: string, notes: string) {
  await updateStudent(studentId, { teacherNotes: notes });
  revalidatePath('/portal/teacher');
}
