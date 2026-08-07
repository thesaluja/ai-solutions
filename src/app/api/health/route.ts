export async function GET() {
  return Response.json({
    status: "ok",
    commitSha: process.env.SOURCE_COMMIT ?? "unknown",
  });
}