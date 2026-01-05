#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

console.log('🔄 更新 @yetuzi/vue3-query-components 到最新版本...');

try {
  // 获取最新版本信息
  const latestVersion = execSync('npm view @yetuzi/vue3-query-components version', {
    encoding: 'utf8'
  }).trim();

  console.log(`📦 最新版本: ${latestVersion}`);

  // 读取当前 package.json
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

  // 更新版本号
  packageJson.dependencies['@yetuzi/vue3-query-components'] = `^${latestVersion}`;

  // 写回 package.json
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

  console.log('✅ 已更新 package.json');

  // 安装新版本
  console.log('📥 安装最新版本...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('🎉 更新完成！');

} catch (error) {
  console.error('❌ 更新失败:', error.message);
  process.exit(1);
}