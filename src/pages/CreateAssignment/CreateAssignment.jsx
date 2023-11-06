
const CreateAssignment = () => {
    return (
        <div className="bg-[#F4F3F0] p-24">
            <h2 className="text-3xl font-extrabold">Create Assignment</h2>
            <form>
                {/* form name and marks row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Assignment Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Assignment Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Marks</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="marks" placeholder="Marks" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                {/* form supplier row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="input-group">
                            <textarea className=" w-full pl-2" rows='3' cols='20' name="description" placeholder="Enter description..."></textarea>
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text"> Difficulty level</span>
                        </label>
                        <label className="input-group">
                            <select name="difficultyLevel" className="w-full">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </label>
                    </div>
                </div>

                {/* form thumbnel url row */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text"> Thumbnail Image URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="imgURL" placeholder="Image URL" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add Assignment" className="btn btn-block" />

            </form>
        </div>
    );
};

export default CreateAssignment;