import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm font-medium">
                <li>
                    <Link href="/" className="text-slate-400 hover:text-blue-900 transition-colors">
                        <Home size={16} />
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <ChevronRight size={16} className="text-slate-300" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-slate-500 hover:text-blue-900 transition-colors capitalize"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-blue-900 font-bold capitalize">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}