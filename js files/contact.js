const gmailLink = document.getElementById("gmailLink");
const whatsappLink = document.getElementById("whatsappLink");
const email = "yetundebabatunde79@gmail.com";
const phoneNumber = "+2349129018827";

gmailLink.href = `mailto:${email}`;
whatsappLink.href = `https://wa.me/${phoneNumber}`;
