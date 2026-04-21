import SubjectCard from '@/components/subjects/SubjectCard';
import subjectsData from '@/data/subjects.json';

export default function SubjectsPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Banner Section */}
            <section className="relative py-20 bg-blue-900 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Subjects</h2>
                    <nav className="text-sm font-medium">
                        <a href="/" className="hover:text-orange-400">Home</a>
                        <span className="mx-2">/</span>
                        <span className="text-orange-400">Subject List</span>
                    </nav>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjectsData.map((subject) => (
                            <SubjectCard key={subject.id} subject={subject} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}