import { useProjects } from "@/contexts/ProjectsContext";
import { Star } from "lucide-react";
import { useState } from "react";


const ProjectReviewForm = ({ id }) => {
    const { updateProject } = useProjects();
    const [review, setReview] = useState<{ rate: number;  comment: string }>({ rate: 0, comment: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (review.rate === 0) return alert("Please select a rating.");
        else if (review.comment.trim().length < 3) return alert("Comment is too short.");

        else {
            await updateProject(review, id).then((res) => {
                setReview({ rate: 0, comment: "" });
            });
        }

    };

    return (
        <form
            className="bg-card p-5 border border-white/10 rounded-xl space-y-3"
            onSubmit={handleSubmit}
        >
            <div className="flex text-green-500 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        onClick={() => setReview({ ...review, rate: star })}
                        className={`cursor-pointer transition ${star <= review.rate
                            ? "text-green-600 fill-green-600"
                            : "opacity-30"
                            }`}
                    />
                ))}
            </div>

            <div>
                <label className="block text-sm mb-1">Your Review</label>
                <textarea
                    className="w-full p-3 bg-muted border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                    rows={3}
                    placeholder="Write your feedback..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
            >
                Submit Review
            </button>
        </form>
    );
}

export default ProjectReviewForm;