import { Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2]
const featureState = process.argv[3]

if (!removedFeatureName) {
  throw new Error('Enter feature flag')
}

if (!featureState) {
  throw new Error('Enter the state of the feature flag (on or off)')
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Invalid state value (on or off)')
}

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()

function isToggleFunction(node: Node) {
  let isToggleFeatures = false

  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeatures = true
    }
  })

  return isToggleFeatures
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOption = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)
      if (!objectOption) return

      const featureNameProperty = objectOption.getProperty('name')
      const onFunctionProperty = objectOption.getProperty('on')
      const offFunctionProperty = objectOption.getProperty('off')

      const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1)

      if (featureName !== removedFeatureName) return

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '')
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '')
      }
    }
  })
})

project.save()
