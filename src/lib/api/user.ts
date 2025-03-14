export async function fetchUserData(clerkId: string) {
  const res = await fetch(`/api/user/${clerkId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}

type RecruiterSchema = {
  company: string;
  phone: string;
  signature: string;
  privacy_agree: boolean;
};

export async function makeUserRecruiter(id: string, data: RecruiterSchema) {
  const res = await fetch(`/api/user/register-recruiter/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to make user recruiter");
  }

  return res.json();
}
