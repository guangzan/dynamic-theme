import { updateTheme } from './update'
import { registerCommands } from './commands'
import { workspace } from 'vscode'
import type { ExtensionContext, ConfigurationChangeEvent, Event } from 'vscode'

export function activate({ subscriptions }: ExtensionContext) {
  const { onDidChangeConfiguration } = workspace

  updateTheme()

  subscriptions.push(
    onDidChangeConfiguration(() => updateTheme()),
    ...registerCommands()
  )
}
