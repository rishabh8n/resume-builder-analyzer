export function ApiResponse<T>(data: T, message = 'success') {
  return { success: true, message, data }
}
