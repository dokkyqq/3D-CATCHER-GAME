export const useTelegramUser = () => {
  if (
    typeof window !== undefined &&
    window.Telegram &&
    window.Telegram.WebApp
  ) {
    const tg = window.Telegram.WebApp
    const user = tg.initDataUnsafe || null
    return user
  } else return { user: undefined }
}
