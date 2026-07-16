"use client";

import { useEffect, useState } from "react";
import SubjectCard from "@/components/subjects/SubjectCard";
import { getSubjects } from "@/lib/clientDb";

interface SubjectsGridProps {
    initialSubjects: any[];
}

export default function SubjectsGrid({ initialSubjects }: SubjectsGridProps) {
    const [subjects, setSubjects] = useState<any[]>(initialSubjects);

    useEffect(() => {
        let active = true;
        async function fetchSubjects() {
            try {
                const data = await getSubjects();
                if (active && Array.isArray(data)) {
                    setSubjects(data);
                }
            } catch (err) {
                console.warn("Failed to fetch subjects from API, using fallback data:", err);
            }
        }
        fetchSubjects();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
            ))}
        </div>
    );
}
