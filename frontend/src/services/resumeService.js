import axiosBaseUrl from "../utils/axios";
import axiosNode from "../utils/axiosNode";

export async function fetchSummaryAPI(payload) {
  const res = await axiosNode.post("/api/resume/summary", payload);
  return res.data.summary;
}

export async function improveBulletsAPI(experience, projects) {
  // send full objects so server can re-serialize points
  const res = await axiosNode.post("/api/resume/improve-bullets", {
    experience: experience.map((e) => ({
      company: e.company,
      position: e.position,
      points: e.points,
    })),
    projects: projects.map((p) => ({ title: p.title, points: p.points })),
  });
  return res.data;
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
