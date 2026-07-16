import Link from 'next/link';
import subjectsData from '@/data/subjects.json';
import SubjectsGrid from './SubjectsGrid';

export default function SubjectsPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Banner Section */}
            <section className="relative py-20 bg-blue-900 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Subjects</h2>
                    <nav className="text-sm font-medium">
                        <Link href="/" className="hover:text-orange-400">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-orange-400">Subject List</span>
                    </nav>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <SubjectsGrid initialSubjects={subjectsData} />
                </div>
            </section>
        </main>
    );
}