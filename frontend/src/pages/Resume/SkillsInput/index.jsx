// src/pages/ResumeBuilder/SkillsInput.jsx
import React, { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addArrayItem,
  removeArrayItem,
  nextStep,
  prevStep,
} from "../../../redux/resumeSlice";

export default function SkillsInput() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.formData.skills);

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    dispatch(
      addArrayItem({
        key: "skills",
        template: {
          category: newCategory,
          items: [],
        },
      })
    );
    setNewCategory("");
  };

  const handleRemoveCategory = (index) => {
    if (skills.length <= 1) return;
    dispatch(removeArrayItem({ key: "skills", index }));
    setSelectedCategory((prev) => Math.max(0, prev - 1));
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    const updatedItems = [
      ...skills[selectedCategory].items,
      { name: newSkill, level: proficiency },
    ];
    dispatch(
      updateField({
        path: ["skills", selectedCategory, "items"],
        value: updatedItems,
      })
    );
    setNewSkill("");
  };

  const handleRemoveSkill = (catIndex, skillIndex) => {
    const updatedItems = skills[catIndex].items.filter((_, i) => i !== skillIndex);
    dispatch(
      updateField({
        path: ["skills", catIndex, "items"],
        value: updatedItems,
      })
    );
  };

  return (
    <div className="skills-form-container">
      <h2>Skills</h2>
      <div className="category-management">
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

        <div className="add-category">
          <Input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="small margin"
          />
          <Button text="Add Category" version="secondary" onClick={handleAddCategory} />
        </div>
      </div>

      <div className="skill-input">
        <h3>{skills[selectedCategory].category}</h3>
        <div className="skill-input-group">
          <Input
            type="text"
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
          <Button text="Add Skill" version="secondary-small" onClick={handleAddSkill} />
        </div>

        <div className="skill-tags">
          {skills[selectedCategory].items.map((skill, idx) => (
            <div key={idx} className="skill-tag">
              {skill.name} ({skill.level})
              <button type="button" onClick={() => handleRemoveSkill(selectedCategory, idx)}>
                ×
              </button>
            </div>
          ))}
        </div>

        {skills.length > 1 && (
          <button
            type="button"
            className="remove-category-btn"
            onClick={() => handleRemoveCategory(selectedCategory)}
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
