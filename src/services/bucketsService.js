export async function createBucket(bucket_id, bucket_name) {
  const response = await fetch("/v1/storage/buckets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketId: bucket_id,
      bucketName: bucket_name,
    }),
  });
  return await response.json();
}
