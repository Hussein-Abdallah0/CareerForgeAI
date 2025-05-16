import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../../redux/resumeSlice";
import useSkillsManager from "../../../hooks/useSkillsManager";
import "./styles.css";

export default function SkillsInput() {
  const dispatch = useDispatch();
  const {
    skills,
    newCategory,
    setNewCategory,
    selectedCategory,
    setSelectedCategory,
    newSkill,
    setNewSkill,
    proficiency,
    setProficiency,
    addCategory,
    removeCategory,
    addSkill,
    removeSkill,
  } = useSkillsManager();

  return (
    <div className="skills-form">
      <h2>Skills</h2>
      <div className="category-management">
        <div className="category-selector">
          <label>Select/Create Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            {skills.map((cat, i) => (
              <option key={i} value={i}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="add-category">
          <Input
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="small margin"
          />
          <Button text="Add Category" version="secondary" onClick={addCategory} />
        </div>
      </div>

      <div className="skill-input">
        <h3>{skills[selectedCategory].category}</h3>
        <div className="skill-input-group">
          <Input
            placeholder="Skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="small margin"
          />
          <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
          <Button text="Add Skill" version="secondary-small" onClick={addSkill} />
        </div>

        <div className="skill-tags">
          {skills[selectedCategory].items.map((sk, idx) => (
            <div key={idx} className="skill-tag">
              {sk.name} ({sk.level})
              <button type="button" onClick={() => removeSkill(selectedCategory, idx)}>
                ×
              </button>
            </div>
          ))}
        </div>

        {skills.length > 1 && (
          <button
            type="button"
            className="remove-category-btn"
            onClick={() => removeCategory(selectedCategory)}
          >
            Remove This Category
          </button>
        )}
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </div>
  );
}
