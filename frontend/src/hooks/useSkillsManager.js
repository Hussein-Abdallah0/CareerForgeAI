import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, addArrayItem, removeArrayItem } from "../redux/resumeSlice";

export default function useSkillsManager() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.formData.skills);

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");

  const addCategory = () => {
    if (!newCategory.trim()) return;
    dispatch(
      addArrayItem({
        key: "skills",
        template: { category: newCategory, items: [] },
      })
    );
    setNewCategory("");
  };

  const removeCategory = (idx) => {
    if (skills.length <= 1) return;
    dispatch(removeArrayItem({ key: "skills", index: idx }));
    setSelectedCategory((s) => Math.max(0, s - 1));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const path = ["skills", selectedCategory, "items"];
    const updated = [...skills[selectedCategory].items, { name: newSkill, level: proficiency }];
    dispatch(updateField({ path, value: updated }));
    setNewSkill("");
  };

  const removeSkill = (catIdx, skillIdx) => {
    const path = ["skills", catIdx, "items"];
    const updated = skills[catIdx].items.filter((_, i) => i !== skillIdx);
    dispatch(updateField({ path, value: updated }));
  };

  return {
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
  };
}
