import { Project } from 'ts-morph'
import path from 'path'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')
const sharedUiDirectory = project.getDirectory(uiPath)
const componentsDirs = sharedUiDirectory?.getDirectories()

componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`
  const indexFile = directory.getSourceFile(indexFilePath)

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}'`
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true
    })

    file.save()
  }
})

// function isAbsolute(value: string) {
//   const layers = ['app', 'shared', 'entities', 'pages', 'features', 'widgets']
//   return layers.some((layer) => value.startsWith(layer))
// }

// files.forEach((sourceFile) => {
//   const importDeclarations = sourceFile.getImportDeclarations()
//   importDeclarations.forEach((importDeclaration) => {
//     const value = importDeclaration.getModuleSpecifierValue()
//
//     if (isAbsolute(value)) {
//       importDeclaration.setModuleSpecifier(`@/${value}`)
//     }
//   })
// })

project.save()
