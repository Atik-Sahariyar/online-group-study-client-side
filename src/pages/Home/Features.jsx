
import useAssignments from "../../hooks/useAssignments";
import FeaturedCard from "./FeaturedCard";

const Features = () => {
    const { assignments, loading } = useAssignments([]);
    console.log(assignments);

    return (
        <div className="my-10">
            <h3 className="text-center">Featured Assignment</h3>
            {loading ? (
                <span className=" h-[80vh] flex justify-center items-center">
                    <p className="text-center text-5xl">Loading assignments...</p>
                </span>
            ) :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments
                        .filter((assignment) => assignment.isFeatured)
                        .map((featuredAssignment) => (
                            <FeaturedCard key={featuredAssignment._id} assignment={featuredAssignment} />
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Features;