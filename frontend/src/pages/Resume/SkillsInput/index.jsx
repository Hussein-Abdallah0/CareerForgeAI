import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";

const SkillsInput = ({ formData, setFormData, nextStep, prevStep }) => {
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [proficiency, setProficiency] = useState("Intermediate");

  const addCategory = () => {
    if (newCategory.trim()) {
      setFormData({
        ...formData,
        skills: [
          ...formData.skills,
          {
            category: newCategory,
            items: [],
          },
        ],
      });
      setNewCategory("");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && formData.skills[selectedCategory]) {
      const updatedSkills = [...formData.skills];
      updatedSkills[selectedCategory].items.push({
        name: newSkill,
        level: proficiency,
      });

      setFormData({ ...formData, skills: updatedSkills });
      setNewSkill("");
    }
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[categoryIndex].items.splice(skillIndex, 1);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const removeCategory = (index) => {
    if (formData.skills.length <= 1) return; // Keep at least one category
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
    setSelectedCategory(Math.min(selectedCategory, updatedSkills.length - 1));
  };

  return (
    <div className="skills-form-container">
      <div className="skills-form">
        <h2>Skills</h2>

        {/* Category management */}
        <div className="category-management">
          <div className="category-selector">
            <label>Select/Create Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {formData.skills.map((skill, index) => (
                <option key={index} value={index}>
                  {skill.category}
                </option>
              ))}
            </select>
          </div>

          <div className="add-category">
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="small margin"
            />
            <Button text="Add Category" version="secondary" onClick={addCategory} />
          </div>
        </div>

        {/* Skills input for selected category */}
        {formData.skills[selectedCategory] && (
          <div className="skill-input">
            <h3>{formData.skills[selectedCategory].category}</h3>
            <div className="skill-input-group">
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Skill name"
                className="small margin"
              />
              {/* <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill name"
            /> */}
              <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <Button text="Add Skill" version="secondary-small" onClick={addSkill} />
            </div>

            <div className="skill-tags">
              {formData.skills[selectedCategory].items.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill.name} ({skill.level})
                  <button onClick={() => removeSkill(selectedCategory, index)}>×</button>
                </div>
              ))}
            </div>

            {formData.skills.length > 1 && (
              <button
                className="remove-category-btn"
                onClick={() => removeCategory(selectedCategory)}
              >
                Remove This Category
              </button>
            )}
          </div>
        )}
      </div>
      <div className="form-actions">
        <Button text="Back" version="border" onClick={prevStep} />
        <Button text="Next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default SkillsInput;
