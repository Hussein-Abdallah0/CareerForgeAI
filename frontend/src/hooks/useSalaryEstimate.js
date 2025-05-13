import { useState } from "react";
import salaryService from "../services/salaryService";
import { useNavigate } from "react-router-dom";

export function useSalaryEstimate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ jobTitle: "", experience: 3, location: "", currentSalary: 0 });
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    setLoading(true);
    try {
      const ai = await salaryService.generate(form);
      await salaryService.saveAnalysis({
        ...form,
        suggestedRange: `${ai.min} - ${ai.max}`,
      });
      navigate("/salary/result", { state: { ...form, ...ai } });
    } catch (e) {
      console.error(e);
      alert("Failed to fetch salary data.");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, updateField, submit };
}
