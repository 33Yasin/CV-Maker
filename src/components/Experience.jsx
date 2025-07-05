import React from "react";

function Experience({ experienceList, setExperienceList }) {

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedList = [...experienceList];
        updatedList[index][name] = value;
        setExperienceList(updatedList);
    }

    const addExperience = () => {
        setExperienceList([
            ...experienceList,
            { company: '', position: '', duration: '' }
        ]);
    };

    return (
        <div>
            <h2>Experience</h2>
            {experienceList.map((exp, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={exp.duration}
                        onChange={(e) => handleChange(index, e)}
                    />
                </div>
            ))}
            <button onClick={addExperience}>Add Experience</button>
        </div>
    )
}

export default Experience;