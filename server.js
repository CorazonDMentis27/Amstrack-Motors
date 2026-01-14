const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  // 👇 Cambiamos los nombres para que coincidan con tu formulario
  const { name, email, subject, message } = req.body;

  // Configura tu transporte SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Cambia si usas otro proveedor
    port: 587,
    secure: false,
    auth: {
      user: "jhoan.casani20@gmail.com",     // tu correo
      pass: "dkjc jena jdqr gbox", // contraseña o App Password (si usas Gmail)
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formulario Web <jhoan.casani20@gmail.com>"` ,
      to: "jhoan.casani20@gmail.com", // destinatario final
      subject: subject ? `📩 ${subject}` : "Nuevo mensaje desde el formulario de contacto",
      text: `
        Nombre: ${name}
        Correo: ${email}
        Asunto: ${subject || "(sin asunto)"}
        Mensaje: ${message}
      `,
    });

    res.status(200).json({ success: true, message: "Correo enviado correctamente ✅" });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar el correo ❌" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

