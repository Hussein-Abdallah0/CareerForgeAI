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
      const bullets = [
        ...draft.experience.flatMap((e) => e.points),
        ...draft.projects.flatMap((p) => p.points),
      ];
      const improved = await improveBulletsAPI(bullets);

      let idx = 0;
      const newExp = draft.experience.map((e) => {
        const pts = improved.slice(idx, idx + e.points.length);
        idx += e.points.length;
        return { ...e, points: pts };
      });
      const newProj = draft.projects.map((p) => {
        const pts = improved.slice(idx, idx + p.points.length);
        idx += p.points.length;
        return { ...p, points: pts };
      });
      setDraft({ ...draft, experience: newExp, projects: newProj });
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
