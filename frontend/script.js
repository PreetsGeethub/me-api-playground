const API_BASE = "https://me-api-playground-lj79.onrender.com";

async function loadProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  const data = await res.json();

  document.getElementById("profile").innerHTML = `
    <strong>Name:</strong> ${data.name}<br/>
    <strong>Email:</strong> ${data.email}<br/>
    <strong>Education:</strong> ${data.education}<br/>
    <strong>GitHub:</strong>
    <a href="${data.github}" target="_blank">${data.github}</a><br/>
    <strong>LinkedIn:</strong>
    <a href="${data.linkedin}" target="_blank">${data.linkedin}</a>
  `;
}

/* ---------------- PROJECTS ---------------- */
function renderProjects(containerId, projects) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!projects || projects.length === 0) {
    container.innerHTML = `<p class="empty">No results found.</p>`;
    return;
  }

  projects.forEach(p => {
    const skills = p.skills
      ? p.skills.map(s => `<span class="skill">${s}</span>`).join("")
      : "";

    const repoLink = p.repo_url
      ? `<a href="${p.repo_url}" target="_blank">GitHub Repo</a>`
      : "";

    const liveLink = p.live_url
      ? `<a href="${p.live_url}" target="_blank">Live Demo</a>`
      : "";

    const links =
      repoLink || liveLink
        ? `<div>${repoLink}${repoLink && liveLink ? " | " : ""}${liveLink}</div>`
        : "";

    container.innerHTML += `
      <div class="project">
        <strong>${p.title}</strong>
        <p>${p.description || ""}</p>
        ${links}
        <div class="skills">${skills}</div>
      </div>
    `;
  });
}

async function loadProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  const data = await res.json();
  renderProjects("projects", data);
}

async function loadSkills() {
  const res = await fetch(`${API_BASE}/skills`);
  const data = await res.json();

  const container = document.getElementById("skills");
  container.innerHTML = data
    .map(skill => `<span class="skill">${skill.name}</span>`)
    .join("");
}

async function searchAll() {
    const q = document.getElementById("searchInput").value.trim();
    if (!q) return;
  
    // Show search section
    document.getElementById("searchSection").style.display = "block";
  
    // Scroll to search results
    document.getElementById("searchSection").scrollIntoView({ behavior: "smooth" });
  
    // Search projects
    const projectRes = await fetch(`${API_BASE}/search?q=${q}`);
    const projects = await projectRes.json();
    renderProjects("searchProjects", projects);
  
    // Search skills
    const skillRes = await fetch(`${API_BASE}/skills/search?q=${q}`);
    const skills = await skillRes.json();
  
    const skillContainer = document.getElementById("searchSkills");
    if (!skills.length) {
      skillContainer.innerHTML = `<p class="empty">No skills found.</p>`;
    } else {
      skillContainer.innerHTML = skills
        .map(s => `<span class="skill">${s.name}</span>`)
        .join("");
    }
  }
  


loadProfile();
loadProjects();
loadSkills();
