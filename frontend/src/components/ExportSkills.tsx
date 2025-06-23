type Skill = {
  id: number;
  name: string;
  proficiency: string;
};

type ExportSkillsProps = {
  skills: Skill[];
};

export default function ExportSkills({ skills }: ExportSkillsProps) {
  // Função para exportar para JSON
  const exportJSON = () => {
    const json = JSON.stringify(skills, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    download(url, "skills.json");
  };

  // Função para exportar para CSV
  const exportCSV = () => {
    if (!skills.length) return;
    const header = Object.keys(skills[0]).join(",") + "\n";
    const rows = skills.map(skill =>
      `${skill.id},"${skill.name.replace(/"/g, '""')}",${skill.proficiency}`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    download(url, "skills.csv");
  };

  // Helper para disparar o download
  const download = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-3 mb-4">
      <button
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        onClick={exportJSON}
        disabled={skills.length === 0}
        title={skills.length === 0 ? "No skills to export" : "Export as JSON"}
      >
        Export JSON
      </button>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        onClick={exportCSV}
        disabled={skills.length === 0}
        title={skills.length === 0 ? "No skills to export" : "Export as CSV"}
      >
        Export CSV
      </button>
    </div>
  );
}