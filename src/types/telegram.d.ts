export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
        }
        expand(): void
        close(): void
        sendData(data: string): void
        MainButton: {
          show(): void
          hide(): void
          setText(text: string): void
          onClick(callback: () => void): void
        }
        BackButton: {
          show(): void
          hide(): void
          onClick(callback: () => void): void
        }
        themeParams?: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          link_color?: string
          button_color?: string
          button_text_color?: string
        }
      }
    }
  }
}
