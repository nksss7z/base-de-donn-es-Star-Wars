import { useState, type FormEvent } from "react";

function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nom.trim() || !email.trim() || !message.trim()) {
      setSucces("");
      return;
    }

    setSucces("Votre message a bien été envoyé !");

    setNom("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <br />
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </div>

        <button type="submit">Envoyer</button>
      </form>

      {succes && <p>{succes}</p>}
    </div>
  );
}

export default Contact;