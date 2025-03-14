export async function fetchUserData(clerkId: string) {
  const res = await fetch(`/api/user/${clerkId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}
