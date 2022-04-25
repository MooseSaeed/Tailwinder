export async function createNewCollection() {
  const response = await fetch("/v1/database/collections", { method: "POST" });
  return await response.json();
}
