import {
  applyVersionBump,
  ensureReleaseFilesAreClean,
  findVersionType,
  hasLocalTag,
  readCurrentBranch,
  releaseGitPaths,
  repoRoot,
  restoreFiles,
  run,
  snapshotFiles,
} from "./release-utils.js";

const versionType = findVersionType();

if (!versionType) {
  console.error("❌ 请指定版本升级类型: patch, minor, or major");
  process.exit(1);
}

console.log("🚀 开始准备 release 流程...");

const releaseSnapshot = snapshotFiles();
let newVersion = "";
let releaseCommitted = false;
let tagCreated = false;

try {
  ensureReleaseFilesAreClean();

  const currentBranch = readCurrentBranch();

  if (currentBranch !== "main") {
    throw new Error(`当前分支为 ${currentBranch}，请切换到 main 后再执行发布`);
  }

  // 1. 升级版本号并更新 CHANGELOG
  console.log(`\n📈 升级版本号 (${versionType}) 并更新 CHANGELOG...`);
  newVersion = applyVersionBump(versionType);

  if (hasLocalTag(`v${newVersion}`)) {
    throw new Error(`本地已存在 tag v${newVersion}，请先处理后再发布`);
  }

  // 2. 发布前校验
  console.log(`\n🔍 执行发布前校验...`);
  run("npm run type-check");

  console.log(`\n📦 构建组件库...`);
  run("npm run build");

  // 3. 提交版本升级和 CHANGELOG
  console.log(`\n📝 提交版本升级和 CHANGELOG...`);
  run(
    `git add ${releaseGitPaths.join(" ")} && git commit -m "chore(release): release version ${newVersion}"`,
    { cwd: repoRoot },
  );
  releaseCommitted = true;

  // 4. 创建 tag
  console.log(`\n🏷️  创建 tag v${newVersion}...`);
  run(`git tag -a v${newVersion} -m "v${newVersion}"`, { cwd: repoRoot });
  tagCreated = true;

  // 5. 交由 GitHub Actions 基于 tag 完成 npm 发布和文档部署
  console.log(`\n☁️  已完成本地 release 准备，GitHub Actions 将在 tag 推送后继续发布...`);
  console.log(`\n📤 请执行以下命令触发远程发布：`);
  console.log(`git push origin main --follow-tags`);

  console.log(`\n✅ release 已准备完成！版本: ${newVersion}`);
} catch (error) {
  if (!releaseCommitted && releaseSnapshot) {
    restoreFiles(releaseSnapshot);
    console.error("↩️ 已恢复版本文件与 CHANGELOG 的变更");
  }

  if (releaseCommitted || tagCreated) {
    console.error("⚠️ 本地可能已创建 release commit 或 tag，请确认后再决定是否推送。");
  }

  console.error("\n❌ 发布失败：", error.message);
  process.exit(1);
}
