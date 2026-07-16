const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('ibt_token');
    }
    return null;
}

async function apiFetch(path: string, options: RequestInit = {}) {
    const token = getToken();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'API Request failed');
    }

    return res.json();
}

export async function login(email: string, password: string) {
    const data = await apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    if (typeof window !== 'undefined') {
        localStorage.setItem('ibt_token', data.token);
        // Set cookies for server-side middleware (1 day expiry)
        document.cookie = `ibt_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `ibt_role=${data.user.role}; path=/; max-age=86400; SameSite=Lax`;
    }
    return data.user;
}

export async function getUserById(id: string) {
    return apiFetch('/api/user');
}

export async function getStudentByUserId(userId: string) {
    return apiFetch('/api/student/profile');
}

export async function getTeacherByUserId(userId: string) {
    return apiFetch('/api/teacher/schedule');
}

export async function getAllStudents() {
    return apiFetch('/api/students');
}

export async function getAllTeachers() {
    return apiFetch('/api/users').then((users: any[]) => users.filter(u => u.role === 'teacher'));
}

export async function getAllUsers() {
    return apiFetch('/api/users');
}

export async function getStats() {
    return apiFetch('/api/admin/stats');
}

export async function getClasses() {
    return apiFetch('/api/classes');
}

export async function createUser(userData: any) {
    const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password || 'password123',
        role: userData.role || 'student',
    };
    return apiFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function updateUser(id: string, userData: any) {
    return userData;
}

export async function deleteUser(id: string) {
    return apiFetch(`/api/users/${id}`, {
        method: 'DELETE',
    });
}

export async function createStudent(studentData: any) {
    return studentData;
}

export async function updateStudent(id: string, studentData: any) {
    return apiFetch(`/api/students/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(studentData),
    });
}

export async function deleteStudent(id: string) {
    return apiFetch(`/api/students/${id}`, {
        method: 'DELETE',
    });
}

export async function createClass(classData: any) {
    return apiFetch('/api/classes', {
        method: 'POST',
        body: JSON.stringify(classData),
    });
}

export async function updateClass(id: string, classData: any) {
    return classData;
}

export async function deleteClass(id: string) {
    return apiFetch(`/api/classes/${id}`, {
        method: 'DELETE',
    });
}

export async function updateTeacher(id: string, teacherData: any) {
    return apiFetch(`/api/teachers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(teacherData),
    });
}

export async function createTeacher(teacherData: any) {
    return apiFetch('/api/teachers', {
        method: 'POST',
        body: JSON.stringify(teacherData),
    });
}

export async function deleteTeacher(id: string) {
    return apiFetch(`/api/teachers/${id}`, {
        method: 'DELETE',
    });
}

// --- Dynamic Public Content Index (Public) ---

export async function getCourses() {
    return apiFetch('/api/courses');
}

export async function getReviews() {
    return apiFetch('/api/reviews');
}

export async function getSubjects() {
    return apiFetch('/api/subjects');
}

export async function getFaqs() {
    return apiFetch('/api/faqs');
}

export async function getServices() {
    return apiFetch('/api/services');
}

export async function getSettings() {
    return apiFetch('/api/settings');
}

export async function getTeachers() {
    return apiFetch('/api/teachers');
}

export async function updateSettings(key: string, value: any) {
    return apiFetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify({ key, value }),
    });
}

// --- Dynamic Public Content CRUD (Admin Only) ---

export async function createCourse(courseData: any) {
    return apiFetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
    });
}

export async function updateCourse(id: string, courseData: any) {
    return apiFetch(`/api/courses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(courseData),
    });
}

export async function deleteCourse(id: string) {
    return apiFetch(`/api/courses/${id}`, {
        method: 'DELETE',
    });
}

export async function createReview(reviewData: any) {
    return apiFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData),
    });
}

export async function updateReview(id: string, reviewData: any) {
    return apiFetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(reviewData),
    });
}

export async function deleteReview(id: string) {
    return apiFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });
}

export async function createSubject(subjectData: any) {
    return apiFetch('/api/subjects', {
        method: 'POST',
        body: JSON.stringify(subjectData),
    });
}

export async function updateSubject(id: string, subjectData: any) {
    return apiFetch(`/api/subjects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(subjectData),
    });
}

export async function deleteSubject(id: string) {
    return apiFetch(`/api/subjects/${id}`, {
        method: 'DELETE',
    });
}

export async function createFaq(faqData: any) {
    return apiFetch('/api/faqs', {
        method: 'POST',
        body: JSON.stringify(faqData),
    });
}

export async function updateFaq(id: string, faqData: any) {
    return apiFetch(`/api/faqs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(faqData),
    });
}

export async function deleteFaq(id: string) {
    return apiFetch(`/api/faqs/${id}`, {
        method: 'DELETE',
    });
}

export async function createService(serviceData: any) {
    return apiFetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(serviceData),
    });
}

export async function updateService(id: string, serviceData: any) {
    return apiFetch(`/api/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(serviceData),
    });
}

export async function deleteService(id: string) {
    return apiFetch(`/api/services/${id}`, {
        method: 'DELETE',
    });
}

export async function logout() {
    try {
        await apiFetch('/api/logout', { method: 'POST' });
    } finally {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('ibt_token');
            localStorage.removeItem('ibt_mock_session');
            document.cookie = "ibt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
            document.cookie = "ibt_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        }
    }
}
