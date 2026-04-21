import { MapPin, MailOpen, Phone, Eye } from "lucide-react";

const infoItems = [
    {
        icon: <MapPin className="text-orange-500" />,
        title: "Office Address",
        details: ["24-30 Assembly Passage", "Stepney Green, London, E1 4UT"],
    },
    {
        icon: <MailOpen className="text-orange-500" />,
        title: "Send Email",
        details: ["info@ibrahimtuition.co.uk"],
    },
    {
        icon: <Phone className="text-orange-500" />,
        title: "Phone",
        details: ["+442039099564", "+447723001329", "+447421904546"],
    },
    {
        icon: <Eye className="text-orange-500" />,
        title: "Opening Time",
        details: ["Mon - Sun : 09:00 - 18:00"],
    },
];

export default function ContactInfo() {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            {infoItems.map((item, idx) => (
                <div key={idx} className={`flex gap-5 ${idx !== infoItems.length - 1 ? "mb-10" : ""}`}>
                    <div className="w-12 h-12 shrink-0 bg-white shadow-sm flex items-center justify-center rounded-lg">
                        {item.icon}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                        {item.details.map((line, i) => (
                            <p key={i} className="text-gray-600 leading-relaxed">{line}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}