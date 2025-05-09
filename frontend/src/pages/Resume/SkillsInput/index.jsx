import { useState } from "react";

const SkillsInput = ({ category, skills, onChange }) => {
  const [newSkill, setNewSkill] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...skills, `${newSkill} (${proficiency})`]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  return (
    <div className="skill-category">
      <h4>{category}</h4>
      <div className="skill-input-group">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={`Add ${category}`}
        />
        <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        <button type="button" onClick={addSkill}>
          + Add
        </button>
      </div>
      <div className="skill-tags">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            {skill}
            <button type="button" onClick={() => removeSkill(index)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
