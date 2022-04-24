export async function getAllUsers(userid) {
  const response = await fetch("/v1/users/" + userid);
  return await response.json();
}
