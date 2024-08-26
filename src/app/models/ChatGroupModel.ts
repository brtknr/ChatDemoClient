export interface ChatGroupModel{
    id:number
    title:string
    lastMessage:string
    avatarUrl:string
    members:string[]
    groupAdmin:string
    messages:string[]
    seen:boolean
    memberCount:number
}