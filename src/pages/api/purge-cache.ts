import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify API token for security
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.PURGE_CACHE_TOKEN;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { urls, purgeAll } = req.body;

  // Validate input
  if (!purgeAll && (!urls || !Array.isArray(urls) || urls.length === 0)) {
    return res.status(400).json({ error: "urls array or purgeAll flag required" });
  }

  try {
    const cfToken = process.env.CLOUDFLARE_API_TOKEN;
    const cfZoneId = process.env.CLOUDFLARE_ZONE_ID;

    if (!cfToken || !cfZoneId) {
      return res.status(500).json({ error: "Cloudflare credentials not configured" });
    }

    const purgePayload = purgeAll
      ? { purge_everything: true }
      : { files: urls };

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${cfZoneId}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purgePayload),
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("Cloudflare purge error:", data.errors);
      return res.status(400).json({ error: data.errors });
    }

    res.status(200).json({
      success: true,
      message: purgeAll ? "All cache purged" : `${urls.length} URL(s) purged`,
      purged: purgeAll ? "all" : urls.length,
    });
  } catch (error) {
    console.error("Cache purge error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
