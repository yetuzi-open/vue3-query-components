import { execSync } from "child_process";
import { existsSync, rmSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { performance } from "perf_hooks";

// 获取命令行参数中的版本升级类型
const args = process.argv.slice(2);
const versionType = args.find((arg) =>
  ["patch", "minor", "major"].includes(arg),
);

// 性能统计开始
const startTime = performance.now();
console.log("🚀 开始构建组件库...");
console.log(`⏱️ 构建开始时间: ${new Date().toLocaleTimeString()}`);

// 只有指定了版本类型时才升级版本号和更新 CHANGELOG
if (versionType) {
  try {
    console.log(`📈 升级版本号 (${versionType}) 并更新 CHANGELOG...`);
    const versionStartTime = performance.now();

    // 使用 standard-version 更新 CHANGELOG 和版本号，但不创建 git tag
    execSync(
      `standard-version --release-as ${versionType} --skip.tag --skip.commit`,
      {
        stdio: "inherit",
      },
    );

    const versionEndTime = performance.now();
    console.log(
      `⏱️ 版本升级耗时: ${(versionEndTime - versionStartTime).toFixed(2)}ms`,
    );
  } catch (error) {
    console.error("❌ 版本号升级失败：", error.message);
    process.exit(1);
  }
}

// 读取当前版本号
const packageJsonPath = path.resolve(process.cwd(), "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const currentVersion = packageJson.version;
console.log(`📌 当前版本: ${currentVersion}`);

// 清理旧的构建产物
const distPath = path.resolve(process.cwd(), "dist");
if (existsSync(distPath)) {
  console.log("🧹 清理旧构建产物...");
  rmSync(distPath, { recursive: true, force: true });
}

// 执行构建
try {
  console.log("📦 构建中...");
  const buildStartTime = performance.now();

  execSync("vite build", {
    stdio: "inherit",
    maxBuffer: 1024 * 1024 * 10, // 增加缓冲区大小
  });

  const buildEndTime = performance.now();
  console.log(
    `⏱️ Vite 构建耗时: ${(buildEndTime - buildStartTime).toFixed(2)}ms`,
  );
  console.log("✅ Vite 构建完成");

  // 后处理
  const jsPath = path.resolve(process.cwd(), "dist/index.js");

  if (!existsSync(jsPath)) {
    throw new Error("index.js not found in dist directory");
  }

  console.log("🧹 后处理中...");
  const postProcessStartTime = performance.now();

  let jsContent = readFileSync(jsPath, "utf8");

  // 替换版本号占位符（Vite 已经加了引号，所以直接替换内容）
  jsContent = jsContent.replace(
    /"__PACKAGE_VERSION__"/g,
    `"${currentVersion}"`,
  );
  jsContent = jsContent.replace(
    /'__PACKAGE_VERSION__'/g,
    `'${currentVersion}'`,
  );

  // 移除 index.css 导入（CSS 会被单独输出到 dist/index.css）
  // 注意：保留 Element Plus 的样式导入，让 unplugin-element-plus 处理并合并到 CSS
  const indexCssImportRegex = /import\s+['"]\.\/index\.css['"]\s*;?\s*/g;

  const indexRemovedImports = jsContent.match(indexCssImportRegex) || [];

  jsContent = jsContent.replace(indexCssImportRegex, "");

  // 写回 JS 文件
  writeFileSync(jsPath, jsContent);

  const postProcessEndTime = performance.now();
  console.log(
    `⏱️ 后处理耗时: ${(postProcessEndTime - postProcessStartTime).toFixed(2)}ms`,
  );
  console.log(
    `   版本号: ${currentVersion}, CSS 导入清理: ${indexRemovedImports.length} 个 index.css 导入`,
  );
  console.log(`   ✨ Element Plus 样式已合并到组件库 CSS 中`);

  // 显示构建产物信息
  console.log("");
  console.log("✅ 构建成功！");

  // 获取构建产物大小
  const jsSize = (readFileSync(jsPath, "utf8").length / 1024).toFixed(2);
  const cssPath = path.resolve(process.cwd(), "dist/index.css");
  const cssSize = existsSync(cssPath)
    ? (readFileSync(cssPath, "utf8").length / 1024).toFixed(2)
    : "0";
  const dtsPath = path.resolve(process.cwd(), "dist/index.d.ts");
  const dtsSize = existsSync(dtsPath)
    ? (readFileSync(dtsPath, "utf8").length / 1024).toFixed(2)
    : "0";

  console.log("");
  console.log("📦 构建产物：");
  console.log(`- dist/index.js      (${jsSize} KB) - ES Module`);
  console.log(`- dist/index.d.ts    (${dtsSize} KB) - TypeScript 声明文件`);
  console.log(`- dist/index.css     (${cssSize} KB) - 样式文件`);
  console.log(`- dist/version-info.json - 版本信息`);

  // 生成版本信息（供 docs 使用）
  try {
    console.log("");
    console.log("📝 生成版本信息...");
    const versionInfoStartTime = performance.now();

    execSync("node scripts/generate-version-info.js", { stdio: "inherit" });

    const versionInfoEndTime = performance.now();
    console.log(
      `⏱️ 版本信息生成耗时: ${(versionInfoEndTime - versionInfoStartTime).toFixed(2)}ms`,
    );
  } catch (error) {
    console.warn("⚠️  版本信息生成失败，但不影响构建");
  }

  // 总体性能统计
  const endTime = performance.now();
  const totalTime = (endTime - startTime).toFixed(2);

  console.log("");
  console.log("🎉 构建完成！");
  console.log(`⏱️ 总耗时: ${totalTime}ms`);
  console.log(`📅 完成时间: ${new Date().toLocaleTimeString()}`);
} catch (error) {
  const endTime = performance.now();
  const totalTime = (endTime - startTime).toFixed(2);

  console.error("❌ 构建失败：", error.message);
  console.error(`⏱️ 失败前耗时: ${totalTime}ms`);
  process.exit(1);
}
