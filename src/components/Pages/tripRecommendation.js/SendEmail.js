export const SendEmail = ({ itineraryObjData, setEmailSent }) => {
  const formData = {
    name: "malvika",
    email: "malvikasen555@gmail.com",
    message: JSON.stringify(itineraryObjData),
  };
  fetch("/api/email/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((data) => {
      setEmailSent("Email sent successfully!");
    })
    .catch((error) => {
      //console.error("Error sending email:", error);
      setEmailSent("Failed to send email.");
    });
};
