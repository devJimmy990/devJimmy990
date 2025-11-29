import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Review {
    _id: string;
    comment: string;
    rate: number;
}

interface ProjectRatingStatsProps {
    reviews: Review[];
}

const ProjectRatingStats = ({ reviews }: ProjectRatingStatsProps) => {
    const [average, setAverage] = useState<number>(0);
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [distribution, setDistribution] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

    useEffect(() => {
        const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let total = 0;
        let score = 0;

        reviews.forEach((review) => {
            dist[review.rate] = (dist[review.rate] || 0) + 1;
            total += 1;
            score += review.rate;
        });

        setDistribution(dist);
        setTotalReviews(total);
        setAverage(total > 0 ? score / total : 0);
    }, [reviews]);

    return (
        <div className="w-full max-w-xl space-y-3">
            {/* Rating + Stars */}
            <div className="flex items-center gap-3">
                <span className="text-5xl font-bold">{average.toFixed(1)}</span>
                <div className="flex text-green-500 text-2xl">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`${i < Math.round(average) ? "text-green-600 fill-green-600" : "opacity-30"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Reviews count */}
            <p className="text-gray-600">{totalReviews.toLocaleString()} reviews</p>

            {/* Rating distribution */}
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star] ?? 0;
                    const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                    return (
                        <div key={star} className="flex items-center gap-3">
                            <span className="w-4 text-sm">{star}</span>
                            <div className="flex-1">
                                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-600 rounded-full transition-all duration-700"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                            <span className="w-10 text-xs text-gray-500 text-right">{percent.toFixed(0)}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectRatingStats;
