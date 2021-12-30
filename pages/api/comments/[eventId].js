function handler(req, res) {
    const eventId = req.query.eventId;

    if (req.method === "POST") {
    //add server side validation
        const { email, name, text } = req.body;

        if (!email.includes("@") ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === '') {
            res.status(422).json({ message: "Invalid input" });
            return;
        }
        console.log(email, name, text);
        const newComment = {
            id: new Date().toISOString,
            email,
            name,
            text
        }
        res.res(201).json({ message: "Added comment", comment: newComment });
      }

    if (req.method === "GET") {
        const dummyList = [
            { id: "c1", name: "Natalia", text: "A first dummy comment" },
            { id: "c2", name: "Julia", text: "A second dummy comment" }
        ];
      res.status(200),json({comments: dummyList})  
}
}
export default handler;