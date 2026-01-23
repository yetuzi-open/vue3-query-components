import { execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

// 获取命令行参数中的版本升级类型
const args = process.argv.slice(2);
const versionType = args.find((arg) =>
  ["patch", "minor", "major"].includes(arg),
);

if (!versionType) {
  console.error("❌ 请指定版本升级类型: patch, minor, or major");
  process.exit(1);
}

console.log("🚀 开始发布流程...");

try {
  // 1. 升级版本号并更新 CHANGELOG
  console.log(`\n📈 升级版本号 (${versionType}) 并更新 CHANGELOG...`);
  execSync(`standard-version --release-as ${versionType}`, {
    stdio: "inherit",
  });

  // 读取新版本号
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const newVersion = packageJson.version;

  // 2. 提交版本升级和 CHANGELOG
  console.log(`\n📝 提交版本升级和 CHANGELOG...`);
  execSync(
    `git add package.json CHANGELOG.md && git commit -m "chore: release v${newVersion}"`,
    { stdio: "inherit" },
  );

  // 3. 创建 tag
  console.log(`\n🏷️  创建 tag v${newVersion}...`);
  execSync(`git tag -a v${newVersion} -m "v${newVersion}"`, {
    stdio: "inherit",
  });

  // 4. 推送 commit 和 tag
  console.log(`\n📤 推送 commit 和 tag 到远程...`);
  execSync("git push", { stdio: "inherit" });
  execSync(`git push origin v${newVersion}`, { stdio: "inherit" });

  // 5. 构建
  console.log(`\n📦 构建组件库...`);
  execSync("npm run build", { stdio: "inherit" });

  // 6. 发布到 npm
  console.log(`\n🚀 发布到 npm...`);
  execSync("npm publish --access public", { stdio: "inherit" });

  console.log(`\n✅ 发布成功！版本: ${newVersion}`);
} catch (error) {
  console.error("\n❌ 发布失败：", error.message);
  process.exit(1);
}
