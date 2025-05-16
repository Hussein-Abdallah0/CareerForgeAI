// src/hooks/useResumeAI.js
import { useState, useRef, useEffect } from "react";
import { fetchSummaryAPI, improveBulletsAPI, saveResumeAPI } from "../services/resumeService";

export default function useResumeAI(formData) {
  const hasFetched = useRef(false);
  const [draft, setDraft] = useState(formData);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingImprove, setLoadingImprove] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const s = await fetchSummaryAPI({
        personal: {
          first_name: draft.first_name,
          last_name: draft.last_name,
          email: draft.email,
          phone: draft.phone,
        },
        education: draft.education,
        experience: draft.experience,
        projects: draft.projects,
        skills: draft.skills,
        jobDescription: draft.jobDescription,
      });
      setSummary(s);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  const improveBullets = async () => {
    setLoadingImprove(true);
    try {
      // call with current lists
      const { experience: expGroups, projects: projGroups } = await improveBulletsAPI(
        draft.experience,
        draft.projects
      );

      // rebuild draft.experience and draft.projects
      const newExperience = draft.experience.map((exp, i) => ({
        ...exp,
        points: expGroups[i] || [],
      }));
      const newProjects = draft.projects.map((proj, i) => ({
        ...proj,
        points: projGroups[i] || [],
      }));

      setDraft({ ...draft, experience: newExperience, projects: newProjects });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingImprove(false);
    }
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      return await saveResumeAPI({ draft, summary });
    } catch (err) {
      console.error("Failed to save resume:", err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    draft,
    setDraft,
    summary,
    loadingSummary,
    loadingImprove,
    saving,
    fetchSummary,
    improveBullets,
    saveResume,
  };
}
