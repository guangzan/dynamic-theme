import type { IOptions } from './types'
import {
  parseTime,
  updateEditorTheme,
  getExtensionConfiguration,
} from './helpers'

export function updateTheme() {
  const { dark, light, darkTime, lightTime } = getExtensionConfiguration()
  const date = new Date()
  const hours = date.getHours() + date.getMinutes() / 60

  parseTime(lightTime) <= hours && hours < parseTime(darkTime)
    ? updateEditorTheme(light)
    : updateEditorTheme(dark)
}
