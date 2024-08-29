export interface MessageResponseModel{
    id : number
    text : string
    senderId : string
    senderUsername : string
    date : string
}




// [Key]
// public int Id { get; set; }
// public string Text { get; set; }
// public string SenderId { get; set; }
// public string SenderUsername { get; set; }
// public string? RecieverId { get; set; }
// public DateTime Date { get; set; }

// [ForeignKey("Id")]
// public int GroupId { get; set; }