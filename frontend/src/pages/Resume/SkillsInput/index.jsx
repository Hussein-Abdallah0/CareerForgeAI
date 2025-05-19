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

  // Suggested categories for quick add
  const suggestedCategories = [
    "Technical Skills",
    "Soft Skills",
    "Languages",
    "Tools & Technologies",
  ];

  return (
    <div className="skills-form">
      <h2>Add Your Skills</h2>
      <p className="form-description">
        Organize your skills into categories to showcase your expertise effectively.
      </p>

      <div className="category-management">
        <div className="category-section">
          <h3>Skill Categories</h3>

          <div className="category-selector">
            <label>Select Category:</label>
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

          <div className="suggested-categories">
            <p>Quick add:</p>
            <div className="suggested-tags">
              {suggestedCategories.map((category, index) => (
                <button
                  key={index}
                  type="button"
                  className="suggested-tag"
                  onClick={() => {
                    setNewCategory(category);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="add-category">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="small"
            />
            <Button
              text="Add Category"
              version="secondary"
              onClick={addCategory}
              disabled={!newCategory.trim()}
            />
          </div>
        </div>

        <div className="skill-input-section">
          <div className="skill-input-header">
            <h3>{skills[selectedCategory]?.category || "Select a category"}</h3>
            {skills.length > 1 && (
              <button
                type="button"
                className="remove-category-btn"
                onClick={() => removeCategory(selectedCategory)}
              >
                Remove Category
              </button>
            )}
          </div>

          {skills[selectedCategory] && (
            <>
              <div className="skill-input-group">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Project Management)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="small"
                />
                <select
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  aria-label="Skill proficiency"
                >
                  <option value="">Proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <Button
                  text="Add"
                  version="primary-small"
                  onClick={addSkill}
                  disabled={!newSkill.trim() || !proficiency}
                />
              </div>

              <div className="skill-tags-container">
                {skills[selectedCategory].items.length > 0 ? (
                  <div className="skill-tags">
                    {skills[selectedCategory].items.map((sk, idx) => (
                      <div key={idx} className="skill-tag">
                        <span className="skill-name">{sk.name}</span>
                        <span className="skill-level">{sk.level}</span>
                        <button
                          type="button"
                          className="remove-skill-btn"
                          onClick={() => removeSkill(selectedCategory, idx)}
                          aria-label={`Remove ${sk.name}`}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">No skills added yet for this category</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </div>
  );
}
