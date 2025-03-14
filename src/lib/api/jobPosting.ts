type NewJobSchema = {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary_min: number;
  salary_max: number;
  employement_type: string;
  tags: [string, ...string[]];
  deadline: Date;
};

export const createJobPosting = async (id: string, data: NewJobSchema) => {
  console.log("DAta", data);
  const res = await fetch(`/api/job-posting/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create job posting");
  }

  return res.json();
};
