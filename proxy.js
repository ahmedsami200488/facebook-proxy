export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetURL = url.searchParams.get("url");

    if (!targetURL) {
      return new Response("❌ No URL provided!", { status: 400 });
    }

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      "Referer": "https://www.facebook.com/",
      "Origin": "https://www.facebook.com",
      "Cookie": "c_user=61559096565634; xs=14%3AaG-ifqKotx8Naw%3A2%3A1739623368%3A-1%3A2906; datr=s4uwZ1Yb1kG7PM7IWRzxtY2x; sb=s4uwZ85DbkVdLTHjpzdsjrZS;"
    };

    try {
      const response = await fetch(targetURL, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        return new Response(`❌ Error fetching stream. HTTP Code: ${response.status}`, { status: response.status });
      }

      const contentType = response.headers.get("Content-Type");

      return new Response(response.body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": contentType
        }
      });

    } catch (error) {
      return new Response(`❌ Error: ${error.message}`, { status: 500 });
    }
  }
};
