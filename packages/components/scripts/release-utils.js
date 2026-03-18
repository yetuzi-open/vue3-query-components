import { execSync } from 'child_process'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import path from 'path'

export const VERSION_TYPES = ['patch', 'minor', 'major']

export const packageRoot = process.cwd()
export const repoRoot = path.resolve(packageRoot, '..', '..')
export const packageDir = path.relative(repoRoot, packageRoot).replace(/\\/g, '/')

export const packageJsonPath = path.resolve(packageRoot, 'package.json')
export const changelogPath = path.resolve(packageRoot, 'CHANGELOG.md')
export const rootPackageLockPath = path.resolve(repoRoot, 'package-lock.json')

export const releaseFilePaths = [packageJsonPath, changelogPath, rootPackageLockPath]
export const releaseGitPaths = [
  'package-lock.json',
  `${packageDir}/package.json`,
  `${packageDir}/CHANGELOG.md`,
]

export const findVersionType = (args = process.argv.slice(2)) => {
  return args.find((arg) => VERSION_TYPES.includes(arg))
}

export const run = (command, options = {}) => {
  return execSync(command, {
    stdio: 'inherit',
    ...options,
  })
}

export const readJson = (filePath) => {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

export const writeJson = (filePath, value) => {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

export const readCurrentVersion = () => {
  return readJson(packageJsonPath).version
}

export const snapshotFiles = (filePaths = releaseFilePaths) => {
  return filePaths.map((filePath) => {
    const exists = existsSync(filePath)

    return {
      filePath,
      exists,
      content: exists ? readFileSync(filePath, 'utf8') : '',
    }
  })
}

export const restoreFiles = (snapshot) => {
  snapshot.forEach(({ filePath, exists, content }) => {
    if (exists) {
      writeFileSync(filePath, content)
      return
    }

    if (existsSync(filePath)) {
      rmSync(filePath, { force: true })
    }
  })
}

export const syncRootWorkspaceVersion = (version) => {
  if (!existsSync(rootPackageLockPath)) {
    return
  }

  const packageLock = readJson(rootPackageLockPath)
  const workspaceEntry = packageLock.packages?.[packageDir]

  if (!workspaceEntry || workspaceEntry.version === version) {
    return
  }

  workspaceEntry.version = version
  writeJson(rootPackageLockPath, packageLock)
}

export const applyVersionBump = (versionType) => {
  run(`standard-version --release-as ${versionType} --skip.tag --skip.commit`)

  const version = readCurrentVersion()
  syncRootWorkspaceVersion(version)

  return version
}

export const ensureReleaseFilesAreClean = () => {
  const output = execSync(
    `git status --porcelain -- ${releaseGitPaths.join(' ')}`,
    {
      cwd: repoRoot,
      encoding: 'utf8',
    },
  ).trim()

  if (output) {
    throw new Error('发布相关文件存在未提交改动，请先处理 package-lock.json、package.json 和 CHANGELOG.md')
  }
}

export const hasLocalTag = (tagName) => {
  const output = execSync(`git tag -l ${tagName}`, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim()

  return output === tagName
}

export const readCurrentBranch = () => {
  return execSync('git branch --show-current', {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim()
}
