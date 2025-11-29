import { Star } from "lucide-react";

export function ReviewItem({ rating, comment }) {
    return (
        <div className="flex gap-4 p-4 bg-card border border-white/10 rounded-xl shadow-sm">
            <img
                loading="lazy"
                src="/user.png"
                alt="User avatar"
                className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex flex-col gap-1">
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < rating ? "fill-yellow-500" : "opacity-30"
                                }`}
                        />
                    ))}
                </div>

                <p className="text-sm text-gray-300">{comment}</p>
            </div>
        </div>
    );
}
