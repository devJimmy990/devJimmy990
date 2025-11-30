import { formatReviewDate } from "@/lib/utils";
import { Star } from "lucide-react";



export function ReviewItem({ rating, comment, date, avatar = "/user.png" }) {
    return (
        <div className="p-4 bg-card border border-white/10 rounded-xl shadow-sm flex flex-col gap-3">

            <div className="flex items-center gap-4">
                <img
                    loading="lazy"
                    src={avatar}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex flex-col">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < rating ? "fill-yellow-500" : "opacity-30"
                                    }`}
                            />
                        ))}
                    </div>

                    <span className="text-xs text-gray-400">
                        {formatReviewDate(date)}
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-300">
                {comment}
            </p>
        </div>
    );
}
