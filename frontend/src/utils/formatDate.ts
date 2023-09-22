export const formatDate = (dateString:string):string =>{
    return new Date(dateString).toLocaleString("en-us",{
        year:"numeric",
        month:"short",
        day:"2-digit",
        hour:"numeric",
        minute:"numeric",
    });
}