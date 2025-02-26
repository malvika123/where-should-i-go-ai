const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const fs = require("fs");

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://whereshouldigoai.com/",
  });

  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/login", changefreq: "weekly", priority: 0.8 },
    { url: "/tripTailor", changefreq: "weekly", priority: 0.8 },
    { url: "/country", changefreq: "weekly", priority: 0.8 },
    { url: "/budget", changefreq: "weekly", priority: 0.8 },
    { url: "/tripInfo", changefreq: "weekly", priority: 0.8 },
    { url: "/budget", changefreq: "weekly", priority: 0.8 },
    { url: "/tripType", changefreq: "weekly", priority: 0.8 },
    { url: "/expectBox", changefreq: "weekly", priority: 0.8 },
    { url: "/tripRecommendation", changefreq: "weekly", priority: 0.8 },
    { url: "/showFinalInfo", changefreq: "weekly", priority: 0.8 },
    { url: "/itinerary", changefreq: "weekly", priority: 0.8 },
    { url: "/ModifyReq", changefreq: "weekly", priority: 0.8 },
    { url: "/register", changefreq: "weekly", priority: 0.8 },
    { url: "/validateEmail", changefreq: "weekly", priority: 0.8 },
    { url: "/forgotPassword", changefreq: "weekly", priority: 0.8 },
    { url: "/payment", changefreq: "weekly", priority: 0.8 },
    { url: "/ResetPassword", changefreq: "weekly", priority: 0.8 },
    { url: "/feedback", changefreq: "weekly", priority: 0.8 },
    { url: "/deleteAccount", changefreq: "weekly", priority: 0.8 },
    { url: "/joinUs", changefreq: "weekly", priority: 0.8 },
    { url: "/privacyPolicy", changefreq: "weekly", priority: 0.8 },
    { url: "/faq", changefreq: "weekly", priority: 0.8 },
    {
      url: "/deleteAccount/validationAndConfirmation",
      changefreq: "weekly",
      priority: 0.8,
    },
    { url: "/SomethingWentWrong", changefreq: "weekly", priority: 0.8 },

    // Add other pages here.
  ];

  links.forEach((link) => sitemap.write(link));
  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);

  fs.writeFileSync("./public/sitemap.xml", sitemapBuffer);
  //console.log("Sitemap generated successfully!");
}

generateSitemap();
