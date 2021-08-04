import { workspace, extensions } from 'vscode'
import type { WorkspaceConfiguration } from 'vscode'
import { IOptions } from './types'
import { updateTheme } from './update'

export function updateEditorTheme(theme: string): void {
  const { update } = workspace.getConfiguration()
  update('workbench.colorTheme', theme, true)
}

export function updateExtensionConfiguration(key: string, value: string) {
  const { update } = workspace.getConfiguration()
  update(`dynamic-theme.${key}`, value, true)
}

export function getExtensionConfiguration(): IOptions {
  const configuration = workspace.getConfiguration('dynamic-theme') as unknown
  return configuration as IOptions
}

export function getThemeList() {
  let themeList: Array<string> = []

  extensions.all.forEach(ext => {
    const contributesThemes = ext.packageJSON.contributes
      ? ext.packageJSON.contributes.themes
        ? ext.packageJSON.contributes.themes
        : undefined
      : undefined

    if (contributesThemes) {
      for (var i = 0; i < contributesThemes.length; i++) {
        const label = contributesThemes[i].label
        const uiTheme =
          contributesThemes[i].uiTheme === 'vs-dark' ? 'dark' : 'light'
        themeList.push(label)
      }
    }
  })

  return themeList
}

export function parseTime(v: string): number {
  const time = v.split(':')
  return Number(time[0]) + Number(time[1]) / 60
}
