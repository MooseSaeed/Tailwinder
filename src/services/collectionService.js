export async function getAllCollections() {
  const response = await fetch("/v1/database/collections");
  return await response.json();
}
