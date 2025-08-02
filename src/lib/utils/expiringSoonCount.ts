// 이번 달 만료 쿠폰 확인 유틸함수
export const isExpiringThisMonth = (dateStr?: string) => {
  if (!dateStr) return false;

  const now = new Date();
  const expireDate = new Date(dateStr);

  return (
    expireDate.getFullYear() === now.getFullYear() &&
    expireDate.getMonth() === now.getMonth()
  );
};