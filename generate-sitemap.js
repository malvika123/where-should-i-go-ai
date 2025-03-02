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
    {
      url: "/articles/travel-insights-1d8smdeh4t",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-2lv0tk5ojz",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-2vweoam6ny",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-4o7hg04tte",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-38h9suns1o",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-39pzk9nzhz",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-56mo5ro6o3",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-20250228",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-bemhyvt05q",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-boe18ocxiw",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-cnrk6kisin",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-com2pl8s95",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-cu6b4rf4kc",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-ftdf76ok3w",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-hzyaqu6h2o",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-lb8u6d5aev",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-lbzcr2wpk9",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-p6h2193qzz",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-p8x7u04n3o",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-rql6jg1bpb",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-t8a1gg12wx",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-tt9o00bn6c",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-u1jrku4u15",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/articles/travel-insights-zv2pby62p9",
      changefreq: "weekly",
      priority: 0.8,
    },

    { url: "/travel-articles", changefreq: "weekly", priority: 0.8 },
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
