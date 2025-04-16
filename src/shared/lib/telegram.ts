export const useTelegramUser = () => {
  const tg = window.Telegram.WebApp
  const user = tg.initDataUnsafe || null
  return user
}