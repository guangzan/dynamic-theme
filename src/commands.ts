import { commands, window } from 'vscode'
import {
  updateExtensionConfiguration,
  getThemeList,
  parseTime,
} from './helpers'

export enum Commands {
  hello = 'helloWorld',
  dark = 'dark',
  light = 'light',
  darkTime = 'darkTime',
  lightTime = 'lightTime',
}

const commandPrefix = 'dynamic-theme.'

export function registerCommands() {
  const light = commands.registerCommand(commandPrefix + Commands.light, () => {
    const themeList = getThemeList()

    window.showQuickPick(themeList).then(res => {
      if (res !== undefined) {
        updateExtensionConfiguration(Commands.light, res)
      }
    })
  })

  const dark = commands.registerCommand(commandPrefix + Commands.dark, () => {
    const themeList = getThemeList()

    window.showQuickPick(themeList).then(res => {
      if (res !== undefined) {
        updateExtensionConfiguration(Commands.dark, res)
      }
    })
  })

  const lightTime = commands.registerCommand(
    commandPrefix + Commands.lightTime,
    () => {
      window.showInputBox().then(res => {
        if (res !== undefined) {
          updateExtensionConfiguration(Commands.lightTime, res)
        }
      })
    }
  )

  const darkTime = commands.registerCommand(
    commandPrefix + Commands.darkTime,
    () => {
      window.showInputBox().then(res => {
        console.log(res)
        if (res !== undefined) {
          updateExtensionConfiguration(Commands.darkTime, res)
        }
      })
    }
  )

  return [dark, light, darkTime, lightTime]
}
