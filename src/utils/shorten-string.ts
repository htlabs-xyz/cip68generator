/**
 * Rút gọn địa chỉ Cardano (bech32)
 * @param address - Địa chỉ đầy đủ
 * @param length - Độ dài phần hiển thị ở đầu và cuối (mặc định là 6 ký tự)
 * @returns Địa chỉ đã được rút gọn
 */
export function shortenString(address: string, length: number = 6): string {
  if (address.length <= length * 2) {
    return address; // Nếu địa chỉ đã ngắn hơn hoặc bằng, trả về nguyên bản
  }
  const start = address.slice(0, length);
  const end = address.slice(-length);
  return `${start}...${end}`;
}
