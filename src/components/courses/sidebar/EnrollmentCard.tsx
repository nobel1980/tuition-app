import { Award, Zap } from "lucide-react";

export default function EnrollmentCard({ groupFee, privateFee }: { groupFee: string, privateFee: string }) {
    return (
        <div className="bg-blue-900 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-900/20 overflow-hidden relative group">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-500" />

            <h3 className="text-2xl font-black mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Award className="text-orange-400" /> Class Fees
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="font-medium opacity-90">Group Class</span>
                    <strong className="text-xl text-orange-400">{groupFee}</strong>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                    <span className="font-medium opacity-90">1-to-1 Private</span>
                    <strong className="text-xl text-orange-400">{privateFee}</strong>
                </div>
            </div>

            <button className="w-full mt-8 bg-orange-500 hover:bg-white hover:text-blue-900 transition-all py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 group">
                <Zap size={18} className="fill-current" />
                Book Free Trial
            </button>

            <p className="text-center text-[10px] uppercase tracking-tighter mt-4 opacity-50 font-bold">
                No credit card required for trial
            </p>
        </div>
    );
}