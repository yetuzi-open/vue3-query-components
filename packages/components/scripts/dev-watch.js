import { spawn } from "child_process"
import { readFileSync, writeFileSync, watchFile, existsSync } from "fs"
import path from "path"

// 读取当前版本号
const packageJsonPath = path.resolve(process.cwd(), "package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"))
const currentVersion = packageJson.version

console.log(`📦 开发模式监听构建 (版本: ${currentVersion})`)

// 替换版本号的函数
function replaceVersion() {
  const jsPath = path.resolve(process.cwd(), "dist/index.js")

  if (!existsSync(jsPath)) {
    return
  }

  try {
    let jsContent = readFileSync(jsPath, "utf8")

    // 替换版本号占位符
    const newContent = jsContent
      .replace(/"__PACKAGE_VERSION__"/g, `"${currentVersion}"`)
      .replace(/'__PACKAGE_VERSION__'/g, `'${currentVersion}'`)

    if (newContent !== jsContent) {
      writeFileSync(jsPath, newContent)
      console.log(`✅ 版本号已更新为: ${currentVersion}`)
    }
  } catch (error) {
    console.error("❌ 替换版本号失败:", error.message)
  }
}

// 启动 Vite watch 构建
const viteProcess = spawn("vite", ["build", "--watch"], {
  stdio: "inherit",
  shell: false,
})

viteProcess.on("error", (err) => {
  console.error("❌ 启动 Vite 失败:", err)
  process.exit(1)
})

// 监听 dist/index.js 文件变化，每次构建后替换版本号
const jsPath = path.resolve(process.cwd(), "dist/index.js")

// 延迟监听，等第一次构建完成
setTimeout(() => {
  replaceVersion()

  if (existsSync(jsPath)) {
    watchFile(jsPath, { interval: 500 }, () => {
      replaceVersion()
    })
  }
}, 3000)

// 处理进程退出
process.on("SIGINT", () => {
  viteProcess.kill()
  process.exit()
})

process.on("SIGTERM", () => {
  viteProcess.kill()
  process.exit()
})
