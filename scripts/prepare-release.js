const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = process.argv[2] || '1.0.0';

console.log(`🚀 Preparing release v${version}...`);

try {
  // Update package.json version
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ Updated package.json version');

  // Add all changes
  execSync('git add .', { stdio: 'inherit' });
  console.log('✅ Added all changes to git');

  // Commit changes
  execSync(`git commit -m "Release v${version}"`, { stdio: 'inherit' });
  console.log('✅ Committed changes');

  // Create tag
  execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
  console.log('✅ Created git tag');

  console.log(`\n🎉 Release v${version} prepared successfully!`);
  console.log('\nNext steps:');
  console.log('1. Push changes: git push origin main');
  console.log(`2. Push tag: git push origin v${version}`);
  console.log('3. Create GitHub release from the tag');

} catch (error) {
  console.error('❌ Error preparing release:', error.message);
  process.exit(1);
}