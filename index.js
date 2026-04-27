export default {
  async fetch(request) {
    const url = new URL(request.url);

    // الرابط اللي تريد تجيبه
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("❌ لازم تضيف ?url=", {
        status: 400,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    try {
      const response = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const html = await response.text();

      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

    } catch (err) {
      return new Response("❌ خطأ في جلب الصفحة: " + err.message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
  },
};
