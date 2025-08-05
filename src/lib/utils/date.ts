export const formatKoreanDate = (dateString:string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR",{
    year:"numeric",
    month:"long",
    day:"numeric"
  })
}