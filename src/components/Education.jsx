import React from "react";

function Education({ educationList, setEducationList }) {

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedList = [...educationList];
        updatedList[index][name] = value;
        setEducationList(updatedList);
    }

    const addEducation = () => {
        setEducationList([
            ...educationList, { school: '', degree: '', year: '' },
        ]);
    };


    return (
        <div>
            <h2>Education</h2>
            {educationList.map((edu, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="school"
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => handleChange(index, e)}
                    />
                </div>
            ))}
            <button onClick={addEducation}>Add Education</button>
        </div>
    );
}

export default Education;