import axios from "axios";
import axiosBaseUrl from "../utils/axios";

export async function fetchSummaryAPI(payload) {
  const res = await axios.post("http://localhost:8080/api/resume/summary", payload);
  return res.data.summary;
}

export async function improveBulletsAPI(bullets) {
  const res = await axios.post("http://localhost:8080/api/resume/improve-bullets", { bullets });
  return res.data.improved;
}

function mapLevelToProficiency(level) {
  switch (level.toLowerCase()) {
    case "beginner":
      return 1;
    case "intermediate":
      return 2;
    case "advanced":
      return 3;
    case "expert":
      return 4;
    default:
      return 1;
  }
}

export async function saveResumeAPI({ draft, summary }) {
  // 1) Save the resume summary + core fields
  const resumeResponse = await axiosBaseUrl.post("/resume", {
    summary,
    job_title: "null",
    experience: draft.experience,
    education: draft.education,
  });

  // 2) Flatten & save skills
  const skillsToSave = draft.skills.flatMap((cat) =>
    cat.items.map((item) => ({
      skill_name: item.name,
      proficiency: mapLevelToProficiency(item.level),
    }))
  );

  await Promise.all(
    skillsToSave.map((skill) =>
      axiosBaseUrl.post("/skill", skill).catch((err) => {
        console.error(`Failed to save skill ${skill.skill_name}:`, err);
      })
    )
  );

  return resumeResponse.data;
}
