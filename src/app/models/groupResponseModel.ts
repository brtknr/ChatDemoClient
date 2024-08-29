export interface GroupResponseModel {
    groupId : number
    title : string
    avatarUrl : string
    lastMessage : string
    members : []
    adminId : string
    adminUsername : string
    messages : []
    createdDate : string
}



// public int GroupId { get; set; }
// public string Title { get; set; }
// public string AvatarUrl { get; set; }
// public List<AppUser> Users { get; set; }
// public string AdminId { get; set; }
// public string AdminUsername { get; set; }
// public List<Message> Messages { get; set; }
// public DateTime CreatedDate { get; set; }