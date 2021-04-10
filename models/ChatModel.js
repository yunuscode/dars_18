/*

    user -- collection

    {
        _id: ObjectId,
        id: uuid, =>> 1
        email: String,
        name: String,
        password: String
    }

    chat -- collection

    {
        _id: MessageId,
        id: uuid,
        from: uuid ==> 1,
        to: uuid ==> 2,
        messageBody: String
    }

*/